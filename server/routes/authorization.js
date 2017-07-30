const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.post('/registration', (req, res) => {
    const registrationData = req.body;

    db.collection('users').findOne({ email: registrationData.email }, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        if (user !== null) res.sendStatus(403);
        else {
          const newUser = {
            email: registrationData.email,
            password: registrationData.password,
            registrationTime: new Date(),
            activeOptions: {
              sort: "time",
              filter: {
                knowledge: [{
                    name: 'weak',
                    value: [1, 4]
                  },
                  {
                    name: 'medium',
                    value: [5, 9]
                  }
                ]
              }
            },
            activeBoard: 0,
            boards: [{
              learningLanguage: registrationData.learningLanguage,
              familiarLanguage: registrationData.familiarLanguage,
              words: []
            }]
          }

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
      db.collection('users').findOne(req.body, (err, user) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          if (user === null) res.sendStatus(403);
          else {
            req.session._id = user._id;
            req.session.activeBoard = user.activeBoard;
            res.send(true);
          }
        }
      });
    }
  });

  app.post('/logout', (req, res) => {
    req.session = null;

    res.send(true);
  });
};
