'use strict'

const PORT = process.env.PORT ||3000;
const server = require('./server').server;

server.listen({ port: PORT, host: '0.0.0.0'})
  .then(() => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
    console.log(`GraphQL Playground is available by going to http://localhost:${PORT}/graphiql`);
  });
