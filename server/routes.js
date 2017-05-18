const prefix = require('./config.json').prefix;
const userLogin = require('./api/user/login.js');

module.exports = [{
  path: `${prefix}/user/login`,
  action: userLogin,
  method: 'POST',
}];
