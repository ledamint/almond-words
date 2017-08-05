const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/options', (req, res) => {
    db.collection('options').findOne({}, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(result.options);
      }
    });
  });

  app.post('/active-options', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id)
    };

    db.collection('users').findOneAndUpdate(userId, { $set: { activeOptions: req.body } }, { upsert: true }, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(true);
      }
    });
  });
}
