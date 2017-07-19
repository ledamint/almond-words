const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/words', (req, res) => {
    db.collection('words').find().toArray((err, words) => {
      if (err) {
        console.log(err);
        res.send(500);
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
        res.send(500);
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
        res.send(500);
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
          res.send(500);
        } else {
          res.send(result.value);
        }
      });
  });
};
