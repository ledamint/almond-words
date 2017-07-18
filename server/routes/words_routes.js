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

    db.collection('words').insert(word, (err, result) => {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/words/:id', (req, res) => {
    const details = {
      _id: new ObjectID(req.params.id)
    };

    // TODO: make find and update in one query
    db.collection('words').findOne(details, (err, result) => {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        const word = result;

        if (word.knowledge !== undefined) {
          word.knowledge += req.body.points;
        } else {
          word.knowledge = 1 + req.body.points;
        }

        if (word.knowledge > 10) word.knowledge = 10;
        if (word.knowledge < 1) word.knowledge = 1;

        db.collection('words').update(details, word, (err, result) => {
          if (err) {
            console.log(err);
            res.send(500);
          } else {
            res.send(word);
          }
        });
      }
    });
  });
};
