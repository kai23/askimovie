const request = require('./request.js');

class PlexAPI {
  constructor(options) {
    this.host = options.hostname;
    this.port = options.port || 32400;
  }

  _getPlexUrl() {
    return `http://${this.host}:${this.port}`;
  }

  async authenticate(login, password) {
    if (!login) throw Error('PlexAPI - authenticate - login missing');
    if (!password) throw Error('PlexAPI - authenticate - username missing');

    const userFound = await request('/users/signin', { method: 'POST', body: { login, password } });
    if (userFound.errors && userFound.errors.error) {
      const code = userFound.errors.error.code;
      const message = userFound.errors.error.message;
      const error = new Error();
      if (code === '1001' || code === '1031') {
        error.code = 'AUTHENTICATION_FAILED';
        error.message = message;
        throw error;
      } else {
        throw Error(`PLEX_ERROR : ${message}`);
      }
    } else {
      return userFound.user;
    }
  }
}

module.exports = PlexAPI;
