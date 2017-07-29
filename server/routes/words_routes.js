const ObjectID = require('mongodb').ObjectID;

// TODO: divide and improve
module.exports = function(app, db) {
  const usersCollection = db.collection('users');

  app.post('/login', (req, res) => {
    if (Object.keys(req.body).length === 0) {
      if (req.session._id) {
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      usersCollection.findOne(req.body, (err, user) => {
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

  app.get('/user', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id)
    };

    usersCollection.findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(user);
      }
    });
  });

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

  app.delete('/words/:id', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id)
    };

    usersCollection.findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const deletingWord = user.boards[user.activeBoard].words.find((word) => {
          return word._id == req.params.id;
        });
        const wordsSelector = `boards.${user.activeBoard}.words`;
        const query = {
          $pull: { [wordsSelector]: deletingWord }
        }

        usersCollection.findOneAndUpdate(userId, query, (err, result) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.send(true);
          }
        });
      }
    });
  });

  app.post('/words', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id)
    };

    const word = req.body;
    word._id = ObjectID();
    word.time = new Date;
    word.knowledge = 1;

    const wordsSelector = `boards.${req.session.activeBoard}.words`;
    const query = {
      $push: { [wordsSelector]: word }
    }

    usersCollection.findOneAndUpdate(userId, query, { returnOriginal: false }, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const user = result.value;
        const words = user.boards[user.activeBoard].words;

        res.send(words[words.length - 1]);
      }
    });
  });

  app.put('/words/:id', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id)
    };
    const changes = req.body;
    delete changes._id;

    usersCollection.findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const updatingWordIndex = user.boards[user.activeBoard].words.findIndex((word) => {
          return word._id == req.params.id;
        });

        const query = { $set: { } };

        for (let key in changes) {
          const wordsSelector = `boards.${user.activeBoard}.words.${updatingWordIndex}.${key}`;

          query.$set[wordsSelector] = changes[key];
        }

        usersCollection.findOneAndUpdate(userId, query, { returnOriginal: false }, (err, result) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            const user = result.value;
            const updatedWord = user.boards[user.activeBoard].words[updatingWordIndex];

            res.send(updatedWord);
          }
        });
      }
    });
  });

  app.get('*', (req, res) => {
    res.redirect('/');
  });
};
