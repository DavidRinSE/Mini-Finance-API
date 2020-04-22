const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// const {UserInputError} = require('apollo-server-express')

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
    }
}

// throw new UserInputError('No user found', {invalidArgs: {username}})

module.exports = mutations