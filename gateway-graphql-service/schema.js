
module.exports.schema = `
  type Game {
    id: ID!
    title: String
  }

  type UserGame {
    gameId: ID!
    game: Game
  }

  type CreateGameResult {
    success: Boolean!
    game: Game
  }

  type LinkUserGameResult {
    success: Boolean!
    reason: String
  }

  type UnlinkUserGameResult {
    success: Boolean!
    reason: String
  }

  type Query {
    "List all available games."
    games: [Game!]!

    "List all games for a user."
    userGames (username: String!): [UserGame!]!
  }

  type Mutation {
    createGame(title: String!): CreateGameResult

    linkGameToUser(gameId: String! username: String!): LinkUserGameResult
    unlinkGameFromUser(gameId: String! username: String!): UnlinkUserGameResult
  }
`;