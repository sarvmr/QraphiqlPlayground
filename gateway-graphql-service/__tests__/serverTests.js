const { createMercuriusTestClient } = require('mercurius-integration-testing');
const { server } = require('../server');
const { mutate, query } = createMercuriusTestClient(server);

const gameTitle = 'Test Game';
const testUser = 'test-user';
let gameId;

describe('gateway server Game and UserGame scenarios', () => {
  it('creates a new game', async () => {
    const { data: { createGame: { success, game } } } = await mutate(
      `mutation {
        createGame(title:"${gameTitle}") {
          success
          game {
            id
          }
        }
      }`
    );

    expect(success).toEqual(true);
    expect(game.id).not.toBeNull();

    gameId = game.id;

    const { data: { games } } = await query(
      `query {
        games {
          title
          id
        }
      }`
    );

    expect(games).toEqual(
      expect.arrayContaining([
        {
          id: gameId,
          title: gameTitle
        }
      ])
    );
  });

  it('links a game to a user', async () => {
    const { data: { linkGameToUser: { success } } } = await mutate(`mutation {
        linkGameToUser (gameId: "${gameId}" username: "${testUser}") {
          success
        }
      }`
    );

    expect(success).toEqual(true);

    const { data: { userGames } } = await query(`query {
        userGames (username: "${testUser}") {
          gameId
          game {
            id
            title
          }
        }
      }`
    );

    expect(userGames).toEqual(
      expect.arrayContaining([
        {
          gameId,
          game: {
            id: gameId,
            title: gameTitle
          }
        }
      ])
    );
  });

  it('unlinks a game from a user', async () => {
    const { data: { unlinkGameFromUser: { success } } } = await mutate(
      `mutation {
        unlinkGameFromUser (gameId: "${gameId}" username: "${testUser}") {
          success
          reason
        }
      }`
    );

    expect(success).toEqual(true);

    const { data: { userGames } } = await query(`query {
        userGames (username: "${testUser}") {
          gameId
          game {
            id
            title
          }
        }
      }`
    );

    expect(userGames).toEqual([]);
  });
});
