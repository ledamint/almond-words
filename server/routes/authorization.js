const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt-nodejs');
const sendEmail = require('../email');
const updateUser = require('../db-actions/user').updateUser;
const decreaseWordsKnowledge = require('../db-actions/words').decreaseWordsKnowledge;

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
        const nextDecreaseWordsTime = new Date();
        // TODO: move sum of + day to config
        nextDecreaseWordsTime.setDate(new Date().getDate() + 1);

        const newUser = {
          email: registrationData.email,
          password: cryptPassword,
          learningLanguage: registrationData.learningLanguage,
          familiarLanguage: registrationData.familiarLanguage,
          registrationTime: new Date(),
          lastLogin: new Date(),
          nextDecreaseWordsTime,
          activeOptions: {
            sort: 'time',
            theme: 'blue',
            isBackgroundActive: true,
            isWordsOpacityActive: true,
            isRecommendedWordsActive: true,
            filter: 'new',
          },
          userPoints: {
            todayPoints: 0,
            todayGoalPoints: 30,
            allPoints: 0,
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
        const userId = {
          _id: new ObjectID(req.session._id),
        };

        decreaseWordsKnowledge(db, userId)
          .then(() => {
            res.send(true);
          });
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

          const userId = {
            _id: new ObjectID(req.session._id),
          };

          decreaseWordsKnowledge(db, userId)
            .then(() => {
              res.send(true);
            });
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

        sendEmail(email, 'Your new password', randomPassword)
          .then(() => {
            updateUser(db, userId, { password: cryptPassword })
              .then(() => {
                res.send(true);
              });
          })
          .catch(() => {
            res.sendStatus(500);
          });
      }
    });
  });

  app.post('/logout', (req, res) => {
    req.session = null;

    res.send(true);
  });
};
