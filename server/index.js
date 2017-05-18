const express = require('express');
const each = require('lodash/each');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

each(routes, (route) => {
  app.use(route.path, route.action);
  console.info(`Listenning ${route.path}`);
});


app.listen(3080);
console.info('----------------------------');
console.info('Listenning on 3080');
