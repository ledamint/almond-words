const decreaseWordsKnowledge = (db, userId) => {
  return new Promise((resolve) => {
    const usersCollection = db.collection('users');

    usersCollection.findOne(userId, (err, user) => {
      if (err) {
        console.log(err);
      } else if (user === null) {
        console.log('not found');
      } else {
        const words = user.boards[user.activeBoard].words.map((word) => {
          if (word.decreaseTime !== undefined) {
            if (typeof word.decreaseTime.time === 'string') word.decreaseTime.time = new Date(word.decreaseTime.time);

            if (word.decreaseTime.time < new Date()) {
              word.knowledge -= 1;

              return word;
            }
          }

          return word;
        });

        const query = {
          $set: {
            [`boards.${user.activeBoard}.words`]: words,
          },
        };

        usersCollection.findOneAndUpdate(userId, query, (err) => {
          if (err) {
            console.log(err);
          }

          resolve();
        });
      }
    });
  });
};

module.exports.decreaseWordsKnowledge = decreaseWordsKnowledge;
