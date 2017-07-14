const PlexAPI = require('plex-api');

const plexConfig = require('../../config.json').plex;
const cookieConfig = require('../../config.json').cookie;

function loginWithPlex(username, password) {
  const options = Object.assign(plexConfig.options, { username, password });
  const client = new PlexAPI(options);
  return client.query('/');
}


module.exports = async (req, res, next) => {
  const { username, password, remember } = req.body;
  try {
    await loginWithPlex(username, password);
    res.json({ status: 'admin' });
  } catch (err) {
    if (err.message === 'Permission denied even after attempted authentication :( Wrong username and/or password maybe?') {
      req.session.user = {
        status: 'member',
        username,
      };
      const sid = Math.random().toString(36).slice(-6);
      req.session.sid = sid;
      res.cookie(cookieConfig.name, sid, { maxAge: remember ? cookieConfig.long : cookieConfig.short });
      req.response = { status: 'member' };
    } else if (err.message === 'Authentication failed, reason: Invalid status code in authentication response from Plex.tv, expected 201 but got 401') {
      res.status(401);
      req.response = { status: 'AUTHENTICATION_FAILED' };
    } else {
      console.error('err', err);
      res.status(500);
      req.response = { status: 'UNEXPECTED_ERROR' };
    }
  } finally {
    console.log('req.response', req.response);
    next();
  }
};
