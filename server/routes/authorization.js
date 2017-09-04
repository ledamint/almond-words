const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt-nodejs');
const sendEmail = require('../email');
const updateUser = require('../db-actions/user').updateUser;

module.exports = (app, db) => {
  app.post('/registration', (req, res) => {
    const registrationData = req.body;

    db.collection('users').findOne({ email: registrationData.email }, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (user !== null) {
        res.status(403).send('Email already exists');
      } else {
        const cryptPassword = bcrypt.hashSync(registrationData.password);
        const newUser = {
          email: registrationData.email,
          password: cryptPassword,
          learningLanguage: registrationData.learningLanguage,
          familiarLanguage: registrationData.familiarLanguage,
          registrationTime: new Date(),
          lastLogin: new Date(),
          activeOptions: {
            sort: 'time',
            theme: 'blue',
            isBackgroundActive: false,
            isWordsOpacityActive: true,
            filter: {
              knowledge: [
                {
                  name: 'in progress',
                  value: [
                    1,
                    9,
                  ],
                },
              ],
            },
          },
          activeBoard: 0,
          boards: [{
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

        const updatePassword = updateUser.bind(null, db, userId, { password: cryptPassword }, res);

        sendEmail(email, 'Your new password', randomPassword, () => res.sendStatus(500), updatePassword);
      }
    });
  });

  app.post('/logout', (req, res) => {
    req.session = null;

    res.send(true);
  });
};
