const resolvers = {
    Query: {
        user: async (_, {username}, {models}) => {
            const user = await models.User.findAll({where: {username}})
            return user[0]
        },
        users: async (_, args, {models}) => {
            const users = await models.User.findAll()
            return users
        },
        history: async (_, {username}, {models}) => {
            const user = await models.User.findAll({where: {username}})
            const history = await user[0].getHistories()
            return history
        }
    },
    User: {
        transactions: async (parent) => {
            const transactions = await parent.getTransactions()
            return transactions
        },
        history: async (parent) => {
            const history = await parent.getHistories()
            return history
        }
    },
    History: {
        categories: async (parent) => {
            const categories = await parent.getHistoryCategories()
            return categories
        }
    }
}

module.exports = resolvers