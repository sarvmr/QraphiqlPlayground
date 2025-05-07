# gateway-graphql-service

This service is responsible for providing a top level GraphQL API that's powered by the **game-service** and **user-game-service**.

## Service Layout

* `__tests__` Simple integration tests to verify happy path for user scenarios.
* `index.js` Service entry point.
* `resolvers.js` GraphQL service query and mutation implementation.
* `server.js` GraphQL server instance.
* `typeDefs.js` GraphQL schema definition.

## Commands

### Install Node Dependencies

    npm i

### Run Server in dev mode with auto-reload on file change

    npm run dev

### Run Server

    npm start

Once you've started the server, you can use the graphiql playground to make requests by going to http://localhost:3000/graphiql.

### Run Tests

These tests will be broken by default, which will require the implementation in `resolvers.js` to run.

    npm test

Once you've completed the implementation you should see:

    > jest

    PASS  __tests__/serverTests.js
      gateway server Game and UserGame scenarios
        ✓ creates a new game (15 ms)
        ✓ links a game to a user (4 ms)
        ✓ unlinks a game from a user (4 ms)

    Test Suites: 1 passed, 1 total
    Tests:       3 passed, 3 total
    Snapshots:   0 total
    Time:        1.408 s, estimated 2 s
    Ran all test suites.