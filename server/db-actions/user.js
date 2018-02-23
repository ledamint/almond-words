// TODO change other update user to this

const updateUser = (db, userId, changes) => new Promise((resolve, reject) => {
  db.collection('users').findOneAndUpdate(userId, { $set: changes }, { returnOriginal: false },
    (err, result) => {
      if (err) {
        console.log(err);
        reject(500);
      } else if (result.value === null) {
        reject(404);
      } else {
        resolve(result.value);
      }
    });
});

module.exports.updateUser = updateUser;
