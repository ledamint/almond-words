const ObjectID = require('mongodb').ObjectID;
const updateUser = require('../db-actions/user').updateUser;

module.exports = (app, db) => {
  app.post('/user-points', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };
    const pointsDifference = req.body.pointsDifference;

    db.collection('users').findOne(userId, (err, user) => {
      let todayPoints = user.userPoints !== undefined ? user.userPoints.todayPoints : 0;
      let allPoints = user.userPoints !== undefined ? user.userPoints.allPoints : 0;

      todayPoints += pointsDifference;
      allPoints += pointsDifference;
      todayPoints = todayPoints < 0 ? 0 : todayPoints;
      allPoints = allPoints < 0 ? 0 : allPoints;

      updateUser(db, userId, { userPoints: { ...user.userPoints, todayPoints, allPoints } })
        .then((updatedUser) => {
          res.send(updatedUser.userPoints);
        })
        .catch((err) => {
          if (err === 404) res.sendStatus(404);
          else if (err === 500) res.sendStatus(500);
        });
    });
  });
};
