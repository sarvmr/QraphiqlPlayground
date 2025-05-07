const fetch = require('node-fetch');

// Define the URLs for the game and user-game services
const GAMES_URL = 'http://game-service/games';
const USER_GAMES_URL = 'http://user-game-service';


module.exports.resolvers = {
  Query: {
    games: async () => {
      // Fetch the list of games from the game service
      const response = await fetch(GAMES_URL);
      const games = await response.json();
      return games;
    },
    userGames: async (_, { username }) => {
      const userResponse = await fetch(`${USER_GAMES_URL}/user-games/${username}`);
      const userLinks = await userResponse.json();

      const gameResponse = await fetch(GAMES_URL);
      const allGames = await gameResponse.json();

      return userLinks.map(link => ({
        gameId: link.gameId,
        game: allGames.find(game => game.id === link.gameId)
      }));
    }
  },
  Mutation: {
    createGame: async (_, { title }) => {
      // Create a new game by sending a POST request to the game service
      const response = await fetch(GAMES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      const game = await response.json();
      return { success: true, game };
    },
    linkGameToUser: async (_, { username, gameId }) => {
      // Link a game to a user by sending a POST request to the user-game service
      try {
        const res = await fetch(`${USER_GAMES_URL}/link`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gameId, username })
        });

        if (!res.ok) {
          console.error('Failed to link game:', res.statusText);
          return { success: false };
        }

        const result = await res.json();
        return { success: result.success };
      } catch (error) {
        console.error('Error linking game:', error);
        return { success: false };  // ensure non-nullable return
      }
    },
    unlinkGameFromUser: async (_, { username, gameId }) => {
      // Unlink a game from a user by sending a DELETE request to the user-game service
      const response = await fetch(`${USER_GAMES_URL}/unlink`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, gameId })
      });
      const result = await response.json();
      return { success: result.success };
    }
  }
};
