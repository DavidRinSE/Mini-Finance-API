const mutations = {
    login: async (_, {username, password}, {models}) => {
        return {token: "It werks!", username}
    }
}

module.exports = mutations