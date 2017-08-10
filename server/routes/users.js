const ObjectID = require('mongodb').ObjectID;

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
        res.send(user);
      }
    });
  });
};
