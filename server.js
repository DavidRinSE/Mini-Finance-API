require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bcrypt = require("bcrypt")
const makeDefaultEntries = require('./defaultData')

const app = express()    

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,  playground: true,
  context: async ({ req }) => ({
    models,
    token: req.headers.authorization || ''
  })
});
server.applyMiddleware({ app });
models.sequelize.authenticate();

const setupDatabase = async (models) => {
  await models.sequelize.sync({"force":true}); //Sanity check for dtatabase tables, CREATE TABLE IF NOT EXISTS
  makeDefaultEntries(models) //Make the default entries to show new users
}

setupDatabase(models)

app.listen({ port: process.env.PORT || 4000}, () => {
  console.log(`Running server on port ${process.env.PORT || 4000}`)
})