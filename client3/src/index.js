import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';


import reducers from './reducers';
import sagas from './sagas';

import App from './containers/App/App.js';
import registerServiceWorker from './registerServiceWorker';

import './index.css';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(routerMiddleware(history));
middlewares.push(sagaMiddleware);

const enhancer = composeWithDevTools(
  applyMiddleware(...middlewares),
);

const store = createStore(reducers, enhancer);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);


if (module.hot) {
  module.hot.accept('./containers/App/App.js', () => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root'),
    );
  });
}

registerServiceWorker();
