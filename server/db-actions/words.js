const decreaseWordsKnowledge = (user, query) => {
  const nextDecreaseWordsTime = new Date();
  // TODO: move sum of + day to config
  nextDecreaseWordsTime.setDate(new Date().getDate() + 1);

  if (user.nextDecreaseWordsTime instanceof Date && user.nextDecreaseWordsTime < new Date()) {
    const words = user.boards[user.activeBoard].words.map((word) => {
      if (word.decreaseTime !== undefined) {
        if (typeof word.decreaseTime.time === 'string') word.decreaseTime.time = new Date(word.decreaseTime.time);

        if (word.decreaseTime.time !== null && word.decreaseTime.time < new Date()) {
          word.knowledge -= 1;
          word.decreaseTime.time = null;

          return word;
        }
      }

      return word;
    });

    query.$set[`boards.${user.activeBoard}.words`] = words;
    query.$set.nextDecreaseWordsTime = nextDecreaseWordsTime;
  }

  if (user.nextDecreaseWordsTime === undefined) {
    query.$set.nextDecreaseWordsTime = nextDecreaseWordsTime;
  }
};

const updateUserPoints = (user, query) => {
  const userPoints = user.userPoints;

  if (userPoints !== undefined) {
    if (userPoints.nextUpdateUserPointsTime === undefined ||
    userPoints.nextUpdateUserPointsTime < new Date()) {
      const nextUpdateUserPointsTime = new Date();
      nextUpdateUserPointsTime.setDate(nextUpdateUserPointsTime.getDate() + 1);
      nextUpdateUserPointsTime.setHours(6);

      const previousDay = new Date();
      previousDay.setDate(previousDay.getDate() - 1);
      const historyPoints = userPoints.historyPoints || [];
      historyPoints.push({
        day: previousDay,
        points: userPoints.todayPoints || 0,
        todayGoalPoints: user.activeOptions.todayGoalPoints || 20,
      });

      query.$set.userPoints = {
        ...userPoints,
        todayPoints: 0,
        nextUpdateUserPointsTime,
        historyPoints,
      };
    }
  }
};

const updateUserValuesByTime = (db, userId) => {
  return new Promise((resolve) => {
    const usersCollection = db.collection('users');

    usersCollection.findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
      } else if (user === null) {
        console.log('not found');
      } else {
        // TODO: add disabling decreasing in options
        const query = {
          $set: {},
        };

        decreaseWordsKnowledge(user, query);
        updateUserPoints(user, query);

        if (Object.keys(query.$set).length !== 0) {
          usersCollection.findOneAndUpdate(userId, query, (err) => {
            if (err) {
              console.log(err);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      }
    });
  });
};

module.exports.updateUserValuesByTime = updateUserValuesByTime;
