const passwords = require('../passwords');

module.exports = {
  url: `mongodb://ledamint:${passwords.db}@ds139781.mlab.com:39781/language-tests`,
};
