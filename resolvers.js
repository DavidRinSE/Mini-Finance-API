const mutations = require("./mutations")
const queries = require("./queries")
const resolvers = {
    Query: {...queries},
    Mutation: {...mutations},
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