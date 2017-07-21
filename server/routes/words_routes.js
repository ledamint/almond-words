const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
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

  app.get('/words', (req, res) => {
    db.collection('words').find().toArray((err, words) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(words);
      }
    });
  });

  app.delete('/words/:id', (req, res) => {
    const wordId = {
      _id: new ObjectID(req.params.id)
    };

    db.collection('words').remove(wordId, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(req.params.id);
      }
    });
  });

  app.post('/words', (req, res) => {
    const word = req.body;
    word.time = new Date;
    word.knowledge = 1;

    db.collection('words').insertOne(word, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/words/:id', (req, res) => {
      const wordId = {
        _id: new ObjectID(req.params.id)
      };

      const changes = req.body;
      delete changes._id;

      db.collection('words').findOneAndUpdate(wordId, { $set: changes }, { returnOriginal: false }, (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.send(result.value);
        }
      });
  });

  app.get('*', (req, res) => {
    res.redirect('/');
  });
};
