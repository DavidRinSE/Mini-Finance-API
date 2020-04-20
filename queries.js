const queries = {
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
}
module.exports = queries