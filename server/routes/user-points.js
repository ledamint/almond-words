const ObjectID = require('mongodb').ObjectID;
const updateUser = require('../db-actions/user').updateUser;

module.exports = (app, db) => {
  app.post('/user-points', (req, res) => {
    const userId = {
      _id: new ObjectID(req.session._id),
    };
    const pointsDifference = req.body.pointsDifference;

    db.collection('users').findOne(userId, (err, user) => {
      const todayPoints = user.userPoints.todayPoints + pointsDifference;
      const allPoints = user.userPoints.allPoints + pointsDifference;

      updateUser(db, userId, { userPoints: { todayPoints, allPoints } })
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
