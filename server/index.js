const express = require('express');
const each = require('lodash/each');
const routes = require('./routes');

const app = express();


each(routes, (route) => {
  app.use(route.path, route.action);
  console.info(`Listenning ${route.path}`);
});


app.listen(3080);
