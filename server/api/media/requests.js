const { moviedb } = require('../../config.json');
const mdb = require('moviedb')(moviedb.key);
const find = require('lodash/find');

function search(requests) {
  const promises = requests.map(request => new Promise((resolve, reject) => {
    if (request.media_type === 'movie') {
      return mdb.movieInfo({ id: request.media_id, language: moviedb.language }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    }
    return mdb.tvInfo({ id: request.media_id, language: moviedb.language }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  }));
  return Promise.all(promises);
}

module.exports = async (req, res, next) => {
  try {
    const requests = await knex('request')
      .join('user', { 'user.uuid': 'request.user_id' })
      .select('user.title', 'request.media_type', 'request.media_id', 'request.created_at', 'request.status');

    const mdbMedias = await search(requests);

    const toReturn = mdbMedias.map((media) => {
      const requestAssociated = find(requests, { media_id: media.id });
      return Object.assign(media, requestAssociated);
    });
    req.response = toReturn;
  } catch (err) {
    res.status(500);
    console.log('err', err);
    req.response = { status: 'errored' };
  } finally {
    next();
  }
};
