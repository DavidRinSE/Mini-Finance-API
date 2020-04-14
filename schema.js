const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    id: Int!
    username: String!
    password: String!
    balance: Int!
    expense: Int!
    income: Int!
    transactions: [Transaction!]!
    history: [History!]!
}

type Transaction {
    id: Int!
    name: String!
    category: String!
    amount: Int!
    date: String!
    isExpense: Boolean!
}

type History {
    id: Int!
    balance: Int!
    income: Int!
    expense: Int!
    startDate: String!
    endDate: String!
    categories: [Categories!]!
}

type Categories {
    id: Int!
    name: String!
    amount: String!
}

type Query {
    user(username: String!): User!
    users: [User!]!
    history(username: String!): [History!]!
}
`

module.exports = typeDefs