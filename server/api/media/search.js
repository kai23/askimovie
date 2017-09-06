const PlexAPI = require('../../plex');
const plexConfig = require('../../config.json').plex;

const { moviedb } = require('../../config.json');
const mdb = require('moviedb')(moviedb.key);

function getConfiguration() {
  return new Promise((resolve, reject) => {
    mdb.configuration((err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}


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
    const mdbConfig = await getConfiguration();
    const foundPlex = await searchPlex(query);
    const found = await search(query);
    const request = await knex('request')
                  .join('user', { 'user.uuid': 'request.user_id' })
                  .select('user.title', 'request.media_id', 'request.created_at', 'request.status');

    const resultsMerged = found.results.filter((f) => {
      const foundResult = f;
      const plexMatch = foundPlex.filter((fp) => {
        if (fp.type === 'show' && foundResult.media_type === 'tv') {
          if (
            fp.title === foundResult.name &&
            foundResult.first_air_date === fp.originallyAvailableAt
          ) {
            return fp;
          }
        }
        if (fp.type === 'movie' && foundResult.media_type === 'movie') {
          if (
            fp.title === foundResult.title &&
            foundResult.release_date === fp.originallyAvailableAt
          ) {
            return fp;
          }
        }
        return null;
      });

      foundResult.isRequested = false;
      const requestMatch = request.filter(r => r.media_id === foundResult.id);
      if (requestMatch.length) {
        foundResult.isRequested = true;
        foundResult.requestedAt = requestMatch[0].created_at;
        foundResult.requestedBy = requestMatch[0].title;
        foundResult.requestStatus = requestMatch[0].status;
      }

      foundResult.inPlex = false;
      if (plexMatch.length) {
        foundResult.inPlex = true;
      }

      if (foundResult.poster_path) {
        foundResult.poster_full_path =
          mdbConfig.images.base_url + mdbConfig.images.logo_sizes[4] + foundResult.poster_path;
        return foundResult;
      }
      return null;
    });

    found.results = resultsMerged;
    req.response = found;
  } catch (err) {
    res.status(401);
    req.response = { status: 'SEARCH_FAILED' };
  } finally {
    next();
  }
};
