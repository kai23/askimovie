const express = require('express');
const each = require('lodash/each');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

each(routes, (route) => {
  const method = route.method.toLowerCase();
  app[method](route.path, route.action);
  console.info(`Route [${route.method.toUpperCase()}] - ${route.path} is alive`);
});


app.listen(3080);
console.info('----------------------------');
console.info('Listenning on 3080');
