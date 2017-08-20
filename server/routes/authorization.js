const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt-nodejs');
const sendEmail = require('../email');

module.exports = (app, db) => {
  app.post('/registration', (req, res) => {
    const registrationData = req.body;

    db.collection('users').findOne({ email: registrationData.email }, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (user !== null) {
        res.status(403).send('Email is already exist');
      } else {
        const cryptPassword = bcrypt.hashSync(registrationData.password);
        const newUser = {
          email: registrationData.email,
          password: cryptPassword,
          registrationTime: new Date(),
          activeOptions: {
            sort: 'time',
            theme: 'blue',
            isBackgroundActive: false,
            isWordsOpacityActive: true,
            filter: {
              knowledge: [{
                name: 'weak',
                value: [1, 4],
              },
              {
                name: 'medium',
                value: [5, 9],
              }],
            },
          },
          activeBoard: 0,
          boards: [{
            learningLanguage: registrationData.learningLanguage,
            familiarLanguage: registrationData.familiarLanguage,
            words: [],
          }],
        };

        db.collection('users').insertOne(newUser, (err, result) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            req.session._id = result.ops[0]._id;
            req.session.activeBoard = result.ops[0].activeBoard;
            res.send(true);
          }
        });
      }
    });
  });

  app.post('/login', (req, res) => {
    if (Object.keys(req.body).length === 0) {
      if (req.session._id) {
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      const loginData = req.body;

      db.collection('users').findOne({ email: loginData.email }, (err, user) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else if (user === null) {
          res.status(404).send('Email doesn\'t exist');
        } else if (!bcrypt.compareSync(loginData.password, user.password)) {
          res.status(403).send('Password is incorrect');
        } else {
          req.session._id = user._id;
          req.session.activeBoard = user.activeBoard;
          res.send(true);
        }
      });
    }
  });

  app.post('/forget-password', (req, res) => {
    const email = req.body.email;

    db.collection('users').findOne({ email }, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (user === null) {
        res.status(404).send('Email doesn\'t exist');
      } else {
        const userId = {
          _id: new ObjectID(user._id),
        };
        const randomPassword = Math.random().toString(36).slice(2, 12);
        const cryptPassword = bcrypt.hashSync(randomPassword);
        const resolve = () => {
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
        };

        sendEmail(email, 'Your new password', randomPassword, () => res.sendStatus(500), resolve);
      }
    });
  });

  app.post('/logout', (req, res) => {
    req.session = null;

    res.send(true);
  });
};
