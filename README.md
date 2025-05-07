# EA Developer Interview Assignment

Complete the **gateway-graphql-service** by implementing a **game-service** and **user-game-service** using a language that you are comfortable with.

## Requirements

* Minimum test coverage of ~ 50% across the entire project would be ideal (there are already some tests in the graphql server).
* **Rationale for implementation decisions are the most important thing we are looking for.**
  * Document thoughts on current project structure, if you restructured the project, why?
* Explanation of how are you ensuring quality of the new functionality you've added.
* Code is clear and easy to understand.
* Container commands and scripts required to run all services are clearly documented.
* Data isn't required to be persisted by each service, but it would be a nice to have.

### User Scenarios

You should be able to use the tests in **gateway-graphql-service** to verify happy path for user scenarios.

1. As a graphql service consumer, when making a **createGame** mutation, then a new game should be available to be added to the list of the user's games.
1. As a graphql service consumer, when making a **games** query, all of the previously created games should be returned.
1. As a graphql service consumer, when making a **linkGameToUser** mutation, then the given game should be linked to the given user.
1. As a graphql service consumer, when making a **unlinkGameFromUser** mutation, then a given game should be unlinked from a user.
1. As a graphql service consumer, when making a **userGames** query with a given user name, the list of games that have been associated to that user should be returned.

## Project Layout

* [game-service](./game-service/README.md) Provides a Game API for adding and returning available games.
* [gateway-graphql-service](./gateway-graphql-service/README.md) Provides a top level graphQL API that's powered by the other services.
* [user-game-service](./user-game-service/README.md) Provides a UserGame API for associating Games to users.
