import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/App/App.js', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}

registerServiceWorker();
