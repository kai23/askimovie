const prefix = require('./config.json').prefix;
const userLogin = require('./api/user/login.js');
const userSession = require('./api/user/session.js');
const mediaSearch = require('./api/media/search.js');
const mediaRequest = require('./api/media/request.js');
const mediaRequests = require('./api/media/requests.js');

module.exports = [{
  path: `${prefix}/v1.0/user/login`,
  action: userLogin,
  method: 'POST',
}, {
  path: `${prefix}/v1.0/user/session`,
  action: userSession,
  method: 'GET',
}, {
  path: `${prefix}/v1.0/media/request/:mediaId`,
  action: mediaRequest,
  method: 'POST',
}, {
  path: `${prefix}/v1.0/media/search/:query`,
  action: mediaSearch,
  method: 'GET',
}, {
  path: `${prefix}/v1.0/media/requests`,
  action: mediaRequests,
  method: 'GET',
}];
