const wordsRoutes = require('./words_routes');

module.exports = function(app, db) {
  wordsRoutes(app, db);
};
