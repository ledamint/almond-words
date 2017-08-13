const authorizationRoutes = require('./authorization');
const usersRoutes = require('./users');
const wordsRoutes = require('./words');
const optionsRoutes = require('./options');
const accountInformationRoutes = require('./account-information');

module.exports = (app, db) => {
  authorizationRoutes(app, db);
  usersRoutes(app, db);
  wordsRoutes(app, db);
  optionsRoutes(app, db);
  accountInformationRoutes(app, db);

  app.get('*', (req, res) => {
    res.redirect('/');
  });
};
