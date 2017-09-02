import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appReducers from './reducers';
import App from './containers/App/App.js';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(appReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);


if (module.hot) {
  module.hot.accept('./containers/App/App.js', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}

registerServiceWorker();
