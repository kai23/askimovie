import React from 'react';
import { Route } from 'react-router-dom';

import Private from './Private';

import Login from '../Login/Login.js';
import Home from '../Home/home.js';


import './App.css';

const App = () => (
  <div className="full-height">
    <Private exact path="/" component={Home} />
    <Route path="/login" component={Login} />
  </div>
);

export default App;
