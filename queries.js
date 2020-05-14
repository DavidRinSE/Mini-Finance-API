const jwt = require("jsonwebtoken")
const { AuthenticationError } = require('apollo-server-express')

const queries = {
    user: async (_, {username}, {models, token}) => {
        try {
            let decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
            const user = await models.User.findAll({where: {username: decoded.username}})
            return user[0]
        } catch (err){
            throw new AuthenticationError("You must be logged in!")
        }
    },
    users: async (_, args, {models}) => {
        const users = await models.User.findAll()
        return users
    },
    history: async (_, {username}, {models, token}) => {
        try {
            let decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
            const user = await models.User.findAll({where: {username: decoded.username}})
            const history = await user[0].getHistories()
            return history
        } catch (err){
            throw new AuthenticationError("You must be logged in!")
        }
        const history = await user[0].getHistories()
        return history
    }
}
module.exports = queries