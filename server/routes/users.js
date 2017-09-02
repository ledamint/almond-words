const ObjectID = require('mongodb').ObjectID;
const updateUser = require('../db-actions/user').updateUser;

module.exports = (app, db) => {
  app.get('/user', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };

    db.collection('users').findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (user === null) {
        res.sendStatus(404);
      } else {
        updateUser(db, userId, { lastLogin: new Date() }, res, user);
      }
    });
  });
};
