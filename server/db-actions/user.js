// TODO change other update user to this

const updateUser = (db, userId, changes, res, response = true) => {
  db.collection('users').findOneAndUpdate(userId, { $set: changes }, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (result.value === null) {
      res.sendStatus(404);
    } else {
      res.send(response);
    }
  });
};

module.exports.updateUser = updateUser;
