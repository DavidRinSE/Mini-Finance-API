const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { AuthenticationError } = require('apollo-server-express')

const mutations = {
    login: async (_, {username, password}, {models}) => {
        const userQuery = await models.User.findAll({where: {username}})
        const user = userQuery[0]
        if (!user) {
            return {error: {message: "No user found"}}
        } else {
            const validpass = await bcrypt.compareSync(password, user.get("password"))
            if (validpass) {
                const payload = {username: user.get("username")}
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "24h"
                })
                return {token}
            } else {
                return {error: {message: "Incorrect password"}}
            }
        }
    },
    createUser: async (_, {username, password}, {models}) => {
        const searchUser = await models.User.findAll({where: {username}})
        if (searchUser.length === 0){
            const hash = await bcrypt.hash(password, 10)
            const user = await models.User.create({
                username,
                password: hash,
                balance: 0,
                income: 0,
                expense: 0
            })
            return user
        } else {
            return {error: {
                message: "User already exist"
            }}
        }
    },
    createTransaction: async (_, {name, amount, date, isExpense, category}, {models, token}) => {
        try {
            let decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
            
            const userQueryArr = await models.User.findAll({where: {username: decoded.username}})
            let user = userQueryArr[0]

            if(isExpense) {
                user = await user.update({
                    balance: user.balance - amount,
                    expense: user.expense + amount
                })
            } else {
                user = await user.update({
                    balance: user.balance + amount,
                    income: user.income + amount
                })
            }

            let data = {name, amount, date, isExpense, category: category || ""}
            const transaction = await models.Transaction.create({
                userId: user.id,
                ...data
            })

            return user
        } catch (err){
            console.log(err)
            throw new AuthenticationError("You must be logged in!")
        }
    },
    deleteUser: async (_, __, {models, token}) => {
        let decoded
        
        try {
            decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
        } catch (err){
            throw new AuthenticationError("You must be logged in!")
        }

        let user = await models.User.findOne({where: {username: decoded.username}})
        
        user = await models.User.destroy({where: {id: user.id}})
        return "Success"
    },
    deleteTransaction: async (_, {id}, {models, token}) => {
        let decoded;
        
        try {
            decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
        } catch (err) {
            throw new AuthenticationError("You must be logged in!")
        }
        
        let user = await models.User.findOne({where: {username: decoded.username}})
        let transaction = await models.Transaction.findOne({where: {id}})

        if(transaction.userId !== user.id){
            throw new AuthenticationError("Cannot destroy a transaction you don't own")
        }

        if (transaction.isExpense) {
            user = await user.update({
                balance: user.balance + transaction.amount,
                expense: user.expense - transaction.amount
            })
        } else {
            user = await user.update({
                balance: user.balance - transaction.amount,
                income: user.income - transaction.amount
            })
        }
        await models.Transaction.destroy({where: {id}})
        return "Success"
    },
    createHistory: async (_, {endDate}, {models, token}) => {
        let decoded;

        try {
            decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
        } catch (err) {
            throw new AuthenticationError("You must be logged in!")
        }

        let user = await models.User.findOne({where: {username: decoded.username}})
        
        const transactions = await user.getTransactions()
        const expenseTransactions = transactions.filter((transaction) => transaction.isExpense)
        const incomeTransactions = transactions.filter((transaction) => !transaction.isExpense)

        
        const history = await models.History.create({
            userId: user.id,
            balance: user.balance,
            income: user.income,
            expense: user.expense,
            startDate: (incomeTransactions[0]) ? incomeTransactions[0].date : expenseTransactions[0].date,
            endDate
        })
        
        let categories = {}
        expenseTransactions.forEach(expense => {
            if (categories[expense.category]){
                categories[expense.category].amount += expense.amount
            } else {
                categories[expense.category] = {
                    historyId: history.id,
                    amount: expense.amount,
                    name: expense.category
                }
            }
        });
        const historyCategory = await models.HistoryCategory.bulkCreate(Object.values(categories))

        user = await user.update({
            balance:0,
            income:0,
            expense:0,
        })

        await models.Transaction.destroy({where: {userId: user.id}})
        return user
    }
}

// throw new UserInputError('No user found', {invalidArgs: {username}})

module.exports = mutations