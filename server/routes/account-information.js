const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt-nodejs');

module.exports = (app, db) => {
  app.post('/email', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };
    const email = req.body;

    db.collection('users').findOne(email, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (user !== null) {
        res.status(403).send('Email is already exist');
      } else {
        db.collection('users').findOneAndUpdate(userId, { $set: email }, { returnOriginal: false }, (err, result) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.send({ email: result.value.email });
          }
        });
      }
    });
  });

  app.post('/password', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };
    const cryptPassword = bcrypt.hashSync(req.body.password);

    db.collection('users').findOneAndUpdate(userId, { $set: { password: cryptPassword } }, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (result.value === null) {
        res.sendStatus(404);
      } else {
        res.send(true);
      }
    });
  });
};
