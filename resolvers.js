const resolvers = {
    Query: {
        user: async (_, {username}) => {
            const user = await getUser(username)
            return user
        },
        users: async () => {
            const users = Users
            return users
        },
        history: async (_, {username}) => {
            const user = await getUser(username)
            const history = await getHistory(user.id)
            return history
        }
    },
    User: {
        transactions: async (parent) => {
            const transactions = await getTransactions(parent.id)
            return transactions
        },
        history: async (parent) => {
            const history = await getHistory(parent.id)
            return history
        }
    },
    History: {
        categories: async (parent) => {
            const categories = getCategories(parent.id)
            return categories
        }
    }
}

const Users = [
    {
        username: "DavidRinSE",
        password: "password",
        balance: 221000,
        income:230000,
        expense:300,
        id: 1
    }
]

const Transactions = [
    {
        userId: 1,
        name: "Red Bull",
        category: "Snacks",
        amount: 300,
        date: "2020-04-03",
        isExpense: true,
        id: 1
    },
    {
        userId: 1,
        name: "Kenzie Academy",
        category: "",
        amount: 230000,
        date: "2020-04-03",
        isExpense: false,
        id: 2
    }
]

const History = [
    {
        userId: 1,
        balance: 15775,
        income: 21050,
        expense: 5275,
        startDate: '2020-03-27',
        endDate: '2020-03-31',
        id: 1
    },
    {
        userId: 1,
        balance: 21600,
        income: 24000,
        expense: 2400,
        startDate: '2020-03-20',
        endDate: '2020-03-26',
        id: 2
    },
    {
        userId: 1,
        balance: 15700,
        income: 20000,
        expense: 4300,
        startDate: '2020-03-13',
        endDate: '2020-03-18',
        id: 3
    },
    {
        userId: 1,
        balance: 16850,
        income: 23000,
        expense: 6150,
        startDate: '2020-03-06',
        endDate: '2020-03-12',
        id: 4
    }
]

const HistoryCategories = [
    {
        historyId: 1,
        name: "Hobbies",
        amount: 5000
    },
    {
        historyId: 1,
        name: "Snacks",
        amount: 275
    },
    {
        historyId: 2,
        name: "Snacks",
        amount: 300
    },
    {
        historyId: 2,
        name: "Gas",
        amount: 2100
    },
    {
        historyId: 3,
        name: "Food",
        amount: 2000
    },
    {
        historyId: 3,
        name: "Gas",
        amount: 2300
    },
    {
        historyId: 4,
        name: "Hobbies",
        amount: 2000
    },
    {
        historyId: 4,
        name: "Food",
        amount: 1850
    },
    {
        historyId: 4,
        name: "Gas",
        amount: 2300
    }
]

const getUser = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                Users.filter(user => user.username === username)[0]
            )
        }, 500)
    })
}

const getTransactions = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                Transactions.filter(trans => trans.userId === userId)
            )
        }, 500)
    })
}

const getHistory = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                History.filter(history => history.userId === userId)
            )
        }, 500)
    })
}

const getCategories = (historyId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                HistoryCategories.filter(category => category.historyId === historyId)
            )
        }, 500)
    })
}

// return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, 500)
// })

module.exports = resolvers