const PlexAPI = require('../../plex');
const plexConfig = require('../../config.json').plex;
const uniq = require('lodash/uniq');

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
                            .select('user.title', 'request.media_id', 'request.created_at');

    const resultsMerged = found.results.filter((f) => {
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

      f.isRequested = false;
      const requestMatch = request.filter(r => r.media_id === f.id);
      if (requestMatch.length) {
        f.isRequested = true;
        f.requestedAt = requestMatch[0].created_at;
        f.requestedBy = requestMatch[0].title;
      }

      f.inPlex = false;
      if (plexMatch.length) {
        f.inPlex = true;
      }

      if (f.poster_path) {
        f.poster_full_path = mdbConfig.images.base_url + mdbConfig.images.logo_sizes[4] + f.poster_path;
        return f;
      }
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
