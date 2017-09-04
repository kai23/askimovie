const request = require('./request.js');
const flatten = require('lodash/flatten');

class PlexAPI {
  constructor(options) {
    this.host = options.hostname;
    this.port = options.port || 32400;
    this.token = options.token || null;
  }

  getPlexUrl() {
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

  async search(query) {
    if (!query) throw Error('PlexAPI - search - query missing');
    try {
      const plexResults = await request(`/hubs/search?sectionId=&query=${query}`, { token: this.token }, this.getPlexUrl());
      const resultsFiltered = plexResults.MediaContainer.Hub.filter(h => parseInt(h.size, 10) > 0 && (h.type === 'movie' || h.type === 'show'));
      const resultsOK = resultsFiltered.map((hub) => {
        if (hub.type === 'show') return [...hub.Directory];
        return [...hub.Video];
      });

      return flatten(resultsOK);
    } catch (err) {
      throw Error(`PLEX_ERROR : ${err.message}`);
    }
  }
}

module.exports = PlexAPI;
