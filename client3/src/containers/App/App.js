import React from 'react';

import Private from './Private';
import NeedNotConnected from './NeedNotConnected';

import Login from '../Login/Login.js';
import Home from '../Home/home.js';


import './App.css';

const App = () => (
  <div className="full-height">
    <Private exact path="/" component={Home} />
    <NeedNotConnected path="/login" component={Login} />
  </div>
);

export default App;
