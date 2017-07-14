const prefix = require('./config.json').prefix;
const userLogin = require('./api/user/login.js');
const userSession = require('./api/user/session.js');

module.exports = [{
  path: `${prefix}/v1.0/user/login`,
  action: userLogin,
  method: 'POST',
}, {
  path: `${prefix}/v1.0/user/session`,
  action: userSession,
  method: 'GET',
}];
