import axios from 'axios';

export default function ResearchGame(value, handleAllGames, e) {
  console.log(value, handleAllGames, e);
  e.preventDefault();
  axios({
    url: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games',
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    data:
      'search "cod";\nfields id, platforms, artworks, summary, genres, category, cover, name, popularity, rating;\nwhere summary!=null & rating != null;\nlimit 25;'
  })
    .then(res => res.data)
    .then(allGamesTab => {
      window.localStorage.setItem('allGames', JSON.stringify(allGamesTab));
      handleAllGames(allGamesTab);
      axios({
        url: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers',
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        data: `fields game, url;\nwhere ${allGamesTab
          .map(game =>
            allGamesTab.indexOf(game) !== allGamesTab.length - 1
              ? `game=${game.id} | `
              : `game=${game.id}`
          )
          .join('')};limit 50;`
      })
        .then(gamesCovers => gamesCovers.data)
        .then(gamesCovers => {
          allGamesTab.map(game => {
            game.url = [];
            for (let i = 0; i < gamesCovers.length; i++) {
              if (game.id === gamesCovers[i].game) {
                game.url = [...game.url, gamesCovers[i].url.replace('t_thumb', 't_1080p')];
              }
            }
          });

          window.localStorage.setItem('allGames', JSON.stringify(allGamesTab));
          handleAllGames(allGamesTab);
        });
      axios({
        url: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/platforms',
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        data: `fields name;\nwhere ${allGamesTab
          .map(game => game.platforms.map(platform => `id=${platform} | `).join(''))
          .join('')
          .slice(0, -2)};limit 50;`
      })
        .then(gamePlatform => gamePlatform.data)
        .then(gamePlatform => {
          allGamesTab.map(game => {
            game.platformsName = [];
            for (let i = 0; i < gamePlatform.length; i++) {
              for (let x = 0; x < game.platforms.length; x++) {
                if (game.platforms[x] === gamePlatform[i].id) {
                  if (gamePlatform[i].name === 'PC (Microsoft Windows)') {
                    game.platformsName = [...game.platformsName, 'Windows'];
                  } else {
                    game.platformsName = [...game.platformsName, gamePlatform[i].name];
                  }
                }
              }
            }
          });
          window.localStorage.setItem('allGames', JSON.stringify(allGamesTab));
          handleAllGames(allGamesTab);
        });
      axios({
        url: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/genres',
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        data: `fields name;\nlimit 50;`
      })
        .then(gameGenre => gameGenre.data)
        .then(gameGenre => {
          allGamesTab.map(game => {
            game.genresName = [];
            for (let i = 0; i < gameGenre.length; i++) {
              for (let x = 0; x < game.genres.length; x++) {
                if (game.genres[x] === gameGenre[i].id) {
                  game.genresName = [...game.genresName, gameGenre[i].name];
                }
              }
            }
          });
          window.localStorage.setItem('allGames', JSON.stringify(allGamesTab));
          handleAllGames(allGamesTab);
        });
      axios({
        url: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/artworks',
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        data: `fields url, id;\nwhere ${allGamesTab
          .map(game =>
            game.artworks
              ? game.artworks
                  .slice(0, 3)
                  .map(artwork => `id=${artwork} | `)
                  .join('')
              : ''
          )
          .join('')
          .slice(0, -2)};limit 50;`
      })
        .then(gameArtworks => gameArtworks.data)
        .then(gameArtworks => {
          allGamesTab.map(game => {
            game.artworksUrl = [];
            for (let i = 0; i < gameArtworks.length; i++) {
              if (!game.artworks) {
                game.artworks = [];
              } else {
                game.artworks = game.artworks.slice(0, 3);
              }
              for (let x = 0; x < game.artworks.length; x++) {
                if (game.artworks[x] === gameArtworks[i].id) {
                  game.artworksUrl = [
                    ...game.artworksUrl,
                    gameArtworks[i].url.replace('t_thumb', 't_1080p')
                  ];
                }
              }
            }
          });
          window.localStorage.setItem('allGames', JSON.stringify(allGamesTab));
          handleAllGames(allGamesTab);
        });
    })
    .catch(err => {
      console.error(err);
    });
}
