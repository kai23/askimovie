const PlexAPI = require('plex-api');
const plexConfig = require('../../config.json').plex;

const { moviedb } = require('../../config.json');
const mdb = require('moviedb')(moviedb.key);

function search(query) {
  return new Promise((resolve, reject) => {
    mdb.searchMulti({ query, language: moviedb.language }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function searchPlex(query) {
  const options = Object.assign(plexConfig.options, { token: plexConfig.token });
  const client = new PlexAPI(options);

  return new Promise((resolve, reject) => {
    client.find('/library/sections', { type: 'movie|shows' }).then((directories) => {
      console.log('directories', directories);
    }, (err) => {
      console.error('Could not connect to server', err);
      reject(err);
    });
  });
}

module.exports = async (req, res, next) => {
  const query = req.params.query;
  try {
    const foundPlex = await searchPlex(query);
    const found = await search(query);

    req.response = found;
  } catch (err) {
    res.status(401);
    console.error(err);
    req.response = { status: 'SEARCH_FAILED' };
  } finally {
    next();
  }
};
