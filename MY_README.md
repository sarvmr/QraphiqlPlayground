# EA Interview Assignment Notes

- Project Structure:
The project maintains separate directories for the game service and user-game service. This decision was made to keep the code organized and modular. JavaScript was chosen as the programming language for its compatibility with the existing gateway service.

- Implementation Approach:
  * Game Service
  The game service operates like a library, providing functions to manage game data. It includes functions to retrieve the list of all games and to add a new game with a given title.

  * User-Game Service
  Similarly, the user-game service functions like a library, managing associations between users and games. It offers functions to retrieve the list of games linked to a user, link a game to a user, and unlink a game from a user.

  * Decoupled Services
  To maintain separation of concerns, the game service and user-game service are designed to operate independently. They do not communicate directly with each other. Instead, the gateway service acts as an intermediary, gathering data from both services and orchestrating interactions.

- Next Steps:
Moving forward, the gateway service will leverage the functionalities provided by the game service and user-game service to create a cohesive GraphQL API. Additionally, considering the modular architecture of the services, there is potential for the game service and user-game service to evolve into separate stand-alone servers accessible via external APIs. This approach would enhance scalability and flexibility, allowing for independent development and deployment of each service.

