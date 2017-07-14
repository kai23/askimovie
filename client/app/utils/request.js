import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json().then((res) => ({ response, jsonResponse: res }));
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response, jsonResponse) {
  if (response.status >= 200 && response.status < 300) {
    return jsonResponse;
  }
  const error = new Error(response.statusText);
  error.response = response;
  error.responseJSON = jsonResponse;
  throw error;
}

/**
 * Requests a URL, returning a promise
 * @param  {string} url         The URL we want to request
 * @param  {object} callOptions The options we want to pass to "fetch"
 * @return {object}             The response data
 */
export default function request(url, callOptions = null) {
  let pUrl = url;
  let baseUrl = '/api';

  if (callOptions && callOptions.raw) {
    baseUrl = '';
  }
  const options = Object.assign({
    headers: {},
    credentials: 'include',
  }, callOptions);
  // turn possible body object to JSON string
  if (options.body) {
    options.body = JSON.stringify(options.body);
    options.headers['Content-Type'] = 'application/json';
  }
  // handle GET params
  if ((typeof options.method !== 'string' || options.method.toUpperCase() === 'GET') && typeof options.params === 'object') {
    const query = Object.keys(options.params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(options.params[key])}`)
      .join('&')
      ;
    pUrl += `?${query}`;
    delete options.params;
  }
  // handle file
  if (options && options.file) {
    baseUrl = '/lycos';
    options.body = options.file;
  }

  return fetch(`${baseUrl}${pUrl}`, options)
    .then(parseJSON)
    .then(({ response, jsonResponse }) => checkStatus(response, jsonResponse))
    ;
}
