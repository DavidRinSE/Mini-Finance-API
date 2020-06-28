require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bcrypt = require("bcrypt")
    
const app = express()    
const port = 4000

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
      models,
      token: req.headers.authorization || ''
    })
});
server.applyMiddleware({ app });
models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port, address:'10.0.0.104' }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
});