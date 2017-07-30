const ObjectID = require('mongodb').ObjectID;

const usersRoutes = require('./users');
const wordsRoutes = require('./words');
const authorizationRoutes = require('./authorization');

module.exports = function(app, db) {
  // add behavior after not found in db
  usersRoutes(app, db);
  wordsRoutes(app, db);
  authorizationRoutes(app, db);

  app.get('*', (req, res) => {
    res.redirect('/');
  });
};
