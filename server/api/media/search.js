const PlexAPI = require('../../plex');
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
  const plexClient = new PlexAPI(Object.assign(plexConfig.options, { token: plexConfig.token }));
  return plexClient.search(query);
}

module.exports = async (req, res, next) => {
  const query = req.params.query;
  try {
    const foundPlex = await searchPlex(query);
    const found = await search(query);

    const resultsMerged = found.results.map((f) => {
      const plexMatch = foundPlex.filter((fp) => {
        if (fp.type === 'show' && f.media_type === 'tv') {
          if (fp.title === f.name && f.first_air_date === fp.originallyAvailableAt) {
            return fp;
          }
        }
        if (fp.type === 'movie' && f.media_type === 'movie') {
          if (fp.title === f.title && f.release_date === fp.originallyAvailableAt) {
            return fp;
          }
        }
      });

      f.inPlex = false;
      if (plexMatch.length) {
        f.inPlex = true;
      }
      return f;
    });

    found.results = resultsMerged;
    req.response = found;
  } catch (err) {
    res.status(401);
    console.error(err);
    req.response = { status: 'SEARCH_FAILED' };
  } finally {
    next();
  }
};
