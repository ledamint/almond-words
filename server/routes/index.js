const ObjectID = require('mongodb').ObjectID;

const authorizationRoutes = require('./authorization');
const usersRoutes = require('./users');
const wordsRoutes = require('./words');
const optionsRoutes = require('./options');

module.exports = function(app, db) {
  // add behavior after not found in db
  authorizationRoutes(app, db);
  usersRoutes(app, db);
  wordsRoutes(app, db);
  optionsRoutes(app, db);

  app.get('*', (req, res) => {
    res.redirect('/');
  });
};
