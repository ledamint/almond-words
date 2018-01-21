const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const dbCongig = require('./config/db');
const routes = require('./server/routes');

const app = express();
const port = process.env.PORT || '8080';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use((req, res, next) => {
  let host = req.get('host');

  if (/^www\./.test(host)) {
    host = host.substring(4, host.length);
    res.writeHead(301, {
      Location: `${req.protocol}://${host}${req.originalUrl}`,
      Expires: new Date().toGMTString(),
    });
    res.end();
  } else {
    next();
  }
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cookieSession({
  httpOnly: true,
  name: 'session',
  keys: ['logarifm', 'mediana'],
  maxAge: 365 * 24 * 60 * 60 * 1000,
}));

MongoClient.connect(dbCongig.url, (err, db) => {
  if (err) return console.log(err);

  routes(app, db);

  app.listen(port, () => {
    console.log(`We are live on ${port}`);
  });
});
