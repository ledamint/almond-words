const decreaseWordsKnowledge = (db, userId) => {
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
          $set: { },
        };
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

module.exports.decreaseWordsKnowledge = decreaseWordsKnowledge;
