'use strict'

const Fastify = require('fastify');
const mercurius = require('mercurius');
const resolvers = require('./resolvers').resolvers;
const schema = require('./schema').schema;

const server = Fastify();

server.register(mercurius, {
  schema,
  resolvers,
  graphiql: true
});

module.exports.server = server;
