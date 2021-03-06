const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    id: Int
    username: String
    password: String
    balance: Int
    expense: Int
    income: Int
    transactions: [Transaction!]
    history: [History!]
    showDefault: Boolean
}

type Transaction {
    id: Int 
    name: String 
    category: String 
    amount: Int 
    date: String 
    isExpense: Boolean
}

type History {
    id: Int 
    balance: Int 
    income: Int 
    expense: Int 
    startDate: String 
    endDate: String 
    categories: [Categories!]
}

type Categories {
    id: Int 
    name: String 
    amount: String
}

type Error {
    message: String
}

type Login {
    token: String
}

type Query {
    user: User 
    users: [User!] 
    history: [History!] 
}

type Mutation {
    login(username: String!, password: String!): Login
    createUser(username: String!, password: String!): Login
    createTransaction(name: String!, amount: Int!, date: String!, isExpense: Boolean!, category: String): User
    deleteUser: String
    deleteTransaction(id: Int!): String
    createHistory(endDate: String!): User
}
`

module.exports = typeDefs