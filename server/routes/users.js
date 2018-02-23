const ObjectID = require('mongodb').ObjectID;
const updateUser = require('../db-actions/user').updateUser;

module.exports = (app, db) => {
  app.get('/user', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };

    updateUser(db, userId, { lastLogin: new Date() })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        if (err === 404) res.sendStatus(404);
        else if (err === 500) res.sendStatus(500);
      });
  });
};
