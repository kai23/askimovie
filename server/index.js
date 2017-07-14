const express = require('express');
const each = require('lodash/each');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middleware/session.js');
const responseMiddleware = require('./middleware/response.js');

require('./db/init.js');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


each(routes, (route) => {
  const method = route.method.toLowerCase();
  app[method](
    route.path,
    sessionMiddleware.get,
    route.action,
    sessionMiddleware.set,
    responseMiddleware,
  );
  console.info(`Route [${route.method.toUpperCase()}] - ${route.path} is alive`);
});


app.listen(3080);
console.info('----------------------------');
console.info('Listenning on 3080');
