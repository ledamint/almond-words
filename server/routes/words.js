const ObjectID = require('mongodb').ObjectID;

// TODO: divide and improve
module.exports = (app, db) => {
  const usersCollection = db.collection('users');

  app.put('/words/:id', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };
    const changes = req.body;
    delete changes._id;

    usersCollection.findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const updatingWordIndex = user.boards[user.activeBoard].words
          .findIndex(word => word._id == req.params.id);

        const query = { $set: { } };

        for (let key in changes) {
          if (Object.prototype.hasOwnProperty.call(changes, key)) {
            const wordsSelector = `boards.${user.activeBoard}.words.${updatingWordIndex}.${key}`;

            query.$set[wordsSelector] = changes[key];
          }
        }

        usersCollection.findOneAndUpdate(userId, query, { returnOriginal: false },
          (err, result) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              const updatedUser = result.value;
              const updatedWord = updatedUser.boards[updatedUser.activeBoard].words[updatingWordIndex];

              res.send(updatedWord);
            }
          });
      }
    });
  });

  app.post('/words', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };

    const word = req.body;
    word._id = new ObjectID();
    word.time = new Date();
    word.knowledge = 1;

    const wordsSelector = `boards.${req.session.activeBoard}.words`;
    const query = {
      $push: { [wordsSelector]: word },
    };

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

  app.delete('/words/:id', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };

    usersCollection.findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (user === null) {
        res.sendStatus(404);
      } else {
        const deletingWord = user.boards[user.activeBoard].words
          .find(word => word._id == req.params.id);

        const wordsSelector = `boards.${user.activeBoard}.words`;
        const query = {
          $pull: { [wordsSelector]: deletingWord },
        };

        usersCollection.findOneAndUpdate(userId, query, (err) => {
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
};
