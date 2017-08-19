module.exports = (app, db) => {
  app.get('/main-info', (req, res) => {
    db.collection('main-info').findOne({ }, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else if (result === null) {
        res.send(404);
      } else {
        res.send(result);
      }
    });
  });
};
