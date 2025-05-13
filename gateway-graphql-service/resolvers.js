const fetch = require('node-fetch');

// Define the URLs for the game and user-game services
const GAMES_URL = 'http://game-service:8000/games';
const USER_GAMES_URL = 'http://user-game-service:8001';


module.exports.resolvers = {
  Query: {
    games: async () => {
      // Fetch the list of games from the game service
      const response = await fetch(GAMES_URL);
      const data = await response.json();
      return Array.isArray(data) ? data : data.games || data.data || [];
    },
    userGames: async (_, { username }) => {
      const userResponse = await fetch(`${USER_GAMES_URL}/user-games/${username}`);
      const userLinks = await userResponse.json();
      if (!Array.isArray(userLinks)) {
        console.error('Invalid user links response:', userLinks);
        userLinks = [];
      }     

      const gameResponse = await fetch(GAMES_URL);
      const allGames = await gameResponse.json();
      if (!Array.isArray(allGames)) {
        console.error('Invalid games response:', allGames);
        return [];
      }
      // Map the user links to include the game object
      return userLinks.map(link => ({
        gameId: link.gameId,  // Explicitly return gameId
        game: allGames.find(game => game.id === link.gameId) || null  // Link the game object
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
      try {
        const res = await fetch(`${USER_GAMES_URL}/link`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gameId, username })
        });
        const result = await res.json();
        if (!res.ok || result.success === false) {
          console.error('Failed to link game:', result.reason || res.statusText);
          return {
            success: false,
            reason: result.reason || 'Unknown error'
          };
        }
        return {
          success: true,
          reason: result.reason || null
        };
      } catch (error) {
        console.error('Error linking game:', error);
        return {
          success: false,
          reason: 'Server error or network failure'
        };
      }
    },
    unlinkGameFromUser: async (_, { username, gameId }) => {
      try {
        const res = await fetch(`${USER_GAMES_URL}/unlink`, {
          method: 'DELETE', // Assuming POST for unlink — switch to DELETE if needed
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, gameId })
        });

        const result = await res.json();

        if (!res.ok || result.success === false) {
          console.error('Failed to unlink game:', result.reason || res.statusText);
          return {
            success: false,
            reason: result.reason || 'Unknown error'
          };
        }
        return {
          success: true,
          reason: null || result.reason
        };
      } catch (error) {
        console.error('Error unlinking game:', error);
        return {
          success: false,
          reason: 'Server error or network failure'
        };
      }
    }
  }
};
