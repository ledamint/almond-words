/* eslint-disable */

function addNewWord(wordData) {
  axios.post('http://almondwords.com/words', wordData)
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      alert(JSON.stringify(error));
    });
};

chrome.extension.onRequest.addListener(function (wordData) {
  addNewWord(wordData);
});
