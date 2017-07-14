const cookieConf = require('../config.json').cookie;
const pick = require('lodash/pick');

async function get(req, res, next) {
  if (!req.headers) next();
  // Récupération de la session en fonction du cookie
  const cookies = req.cookies;
  try {
    if (cookies && cookies[cookieConf.name]) {
    // Récupération de la session en fonction du sid
      const sid = cookies[cookieConf.name];
      let session = [];
      const sessionDB = await knex('session')
        .where({ sid, expired: false })
        .andWhere('expired_at', '>', +new Date());
      console.log('sessionDB', sessionDB);
      if (sessionDB.length) session = JSON.parse(sessionDB[0].session);
      else res.clearCookie(cookies[cookieConf.name]);
      req.session = session;
    } else {
      req.session = {};
    }
  } catch (err) {
    console.error(err);
    req.session = {};
  } finally {
    next();
  }
}

async function set(req, res, next) {
  const sessionToSave = pick(req.session, 'user');
  if (!Object.keys(sessionToSave).length) next();

  // J'ai bien une session à sauver en DB
  const sid = req.session.sid;
  const additionalTime = req.body && req.body.remember && req.url.includes('login') ?
      cookieConf.long :
      cookieConf.short;

  const dto = {
    sid,
    session: JSON.stringify(sessionToSave),
    expired: false,
    expired_at: (parseInt(+new Date()) + parseInt(additionalTime)),
  };
  try {
    await knex('session').insert(dto);
  } catch (err) {
    console.error(err);
  } finally {
    next();
  }
}


module.exports = {
  get,
  set,
};
