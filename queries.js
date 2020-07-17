const jwt = require("jsonwebtoken")
const { AuthenticationError } = require('apollo-server-express')

const queries = {
    user: async (_, {username}, {models, token}) => {
        try {
            let decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
            let user = await models.User.findAll({where: {username: decoded.username}})
            if(user[0].showDefault){
                user = await models.User.findAll({where: {username: 'default_user'}})
            }
            return user[0]
        } catch (err){
            console.log(err)
            throw new AuthenticationError("You must be logged in!")
        }
    },
    users: async (_, args, {models}) => {
        const users = await models.User.findAll()
        return users
    },
    history: async (_, {username}, {models, token}) => {
        let decoded;
        try {
            decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
        } catch (err){
            throw new AuthenticationError("You must be logged in!")
        }
        let user = await models.User.findAll({where: {username: decoded.username}})
        if(user[0].showDefault){
            user = await models.User.findAll({where: {username: 'default_user'}})
        }
        const history = await user[0].getHistories()
        return history
    }
}
module.exports = queries