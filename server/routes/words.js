const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  const usersCollection = db.collection('users');

  app.get('/recommended-words/', (req, res) => {
    db.collection('recommended-words').findOne({ }, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const recommendedWords = result.words;
        const limit = Number(req.query.limit || 50);

        if (req.query.random === '1') {
          const randomRecommendedWords = [];

          for (let i = 0; i < 50; i += 1) {
            const randomIndex = Math.floor(Math.random() * recommendedWords.length);
            const randomRecommendedWord = recommendedWords[randomIndex];

            randomRecommendedWords.push(randomRecommendedWord);
            recommendedWords.splice(randomIndex, 1);
          }

          res.send(randomRecommendedWords.slice(0, limit));
        }

        if (req.query.search !== undefined) {
          const lang = req.query.lang;

          if (lang !== undefined) {
            const recommendedWordsBySearch = recommendedWords
              .filter(word => word[lang].indexOf(req.query.search) === 0);

            res.send(recommendedWordsBySearch.slice(0, limit));
          }
        }
      }
    });
  });

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
          .findIndex(word => word._id.toString() === req.params.id);

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
    if (req.session._id !== undefined) {
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
        } else if (result.value === null) {
          res.sendStatus(404);
        } else {
          const user = result.value;
          const words = user.boards[user.activeBoard].words;

          res.send(words[words.length - 1]);
        }
      });
    } else {
      res.sendStatus(404);
    }
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
          .find(word => word._id.toString() === req.params.id);

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
