const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || '3000';
const dbCongig = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

MongoClient.connect(dbCongig.url, (err, db) => {
  if (err) return console.log(err);
  require('./server/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
