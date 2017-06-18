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
    const wordId = { _id:  new ObjectID(req.params.id) };
    console.log(wordId);

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
    const word = {
      english: req.body.english,
      russian: req.body.russian,
      time: new Date()
    };

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
    const details = { _id:  new ObjectID(req.params.id) };
    const word = {
      english: req.body.english,
      russian: req.body.russian
    };

    db.collection('words').update(details, word, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occured' });
      } else {
        res.send(word);
      }
    });
  });
};
