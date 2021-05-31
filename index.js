/* eslint-disable no-console */
const { ApolloServer, PubSub } = require('apollo-server');
const express = require('express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const db = require('./config/connection');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // so we can access the request body in the context, so we can do stuff like checking for authentication in protected routes
  context: ({ req }) => ({ req, pubsub }),
});

server.applyMiddleware({ App });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
