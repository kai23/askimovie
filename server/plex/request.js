const request = require('request');
const parser = require('xml2json');

function buildURL(url, endpoint, plexHeaders, other) {
  let plexHeadersString = Object.keys(plexHeaders)
    .reduce((prev, curr) => `${prev}&${curr}=${encodeURIComponent(plexHeaders[curr])}`, '');
  plexHeadersString = plexHeadersString.substring(1);
  return `${url + endpoint}${endpoint.indexOf('?') > -1 ? '&' : '?'}${plexHeadersString}`;
}

function resultToJson(result) {
  return JSON.parse(parser.toJson(result));
}

module.exports = (endpoint, options, url = 'https://plex.tv/api/v2') =>
  new Promise((resolve, reject) => {
    const queryParams = {
      'X-Plex-Product': 'Plex Web',
      'X-Plex-Version': '3.9.1',
      'X-Plex-Client-Identifier': 'pv3yyqb5wcld3cnfx1qk9j81',
      'X-Plex-Platform': 'Chrome',
      'X-Plex-Platform-Version': '60.0',
      'X-Plex-Device': 'Linux',
      'X-Plex-Device-Name': 'Plex Web Chrome',
      'X-Plex-Device-Screen-Resolution': '1920x940 1920x1080',
    };

    if (options.token) {
      queryParams['X-Plex-Token'] = options.token;
    }
    const urlToQuery = buildURL(url, endpoint, queryParams);
    const method = (options.method || 'GET').toLowerCase();

    if (method === 'post') {
      const formData = options.body;
      request[method]({ url: urlToQuery, formData }, (err, httpResponse, body) => {
        if (err) reject(err);
        resolve(resultToJson(body));
      });
    } else {
      request[method]({ url: urlToQuery }, (err, httpResponse, body) => {
        if (err) reject(err);
        resolve(resultToJson(body));
      });
    }
  });
