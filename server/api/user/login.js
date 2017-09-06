const PlexAPI = require('../../plex');

const plexConfig = require('../../config.json').plex;
const cookieConfig = require('../../config.json').cookie;

function loginWithPlex(username, password) {
  const plexClient = new PlexAPI(plexConfig.options);
  return plexClient.authenticate(username, password);
}


module.exports = async (req, res, next) => {
  const { username, password, remember } = req.body;
  try {
    const user = await loginWithPlex(username, password);
    req.session.user = {
      id: user.uuid,
      username,
      thumb: user.thumb,
      authToken: user.authToken,
    };
    const sid = Math.random().toString(36).slice(-6);
    req.session.sid = sid;
    res.cookie(cookieConfig.name, sid, { maxAge: remember ? cookieConfig.long : cookieConfig.short });
    req.response = { status: 'member' };
  } catch (err) {
    if (err.code === 'AUTHENTICATION_FAILED') {
      res.status(401);
      req.response = { status: 'AUTHENTICATION_FAILED' };
    } else {
      console.error(err);
      res.status(500);
      req.response = { status: 'UNEXPECTED_ERROR' };
    }
  } finally {
    next();
  }
};
