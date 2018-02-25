const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.post('/active-options', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };

    db.collection('users').findOneAndUpdate(userId, { $set: { activeOptions: req.body } },
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else if (result.value === null) {
          res.send(404);
        } else {
          res.send(true);
        }
      });
  });
};
