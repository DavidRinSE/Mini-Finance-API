const {UserInputError} = require('apollo-server-express')
const mutations = {
    login: async (_, {username, password}, {models}) => {
        
    }
}

// throw new UserInputError('No user found', {invalidArgs: {username}})

module.exports = mutations