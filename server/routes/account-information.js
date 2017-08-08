const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  // TODO: add checking existing emails
  app.post('/email', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id)
    };
    const email = req.body;

    db.collection('users').findOneAndUpdate(userId, { $set: email }, { returnOriginal: false }, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {        
        res.send(result.value.email);
      }
    });
  });
}
