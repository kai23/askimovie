const express = require('express');
const app = express();
const routes = require('./routes');
const each = require('lodash');


each(routes, (route) => {
  app.use(route.path, route.action);
});
