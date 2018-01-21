/* eslint-disable */

var wordForm = document.forms[0];

wordForm.addEventListener('submit', function (e) {
  e.preventDefault();

  axios.post('http://almondwords.com/words', {
      learningWord: wordForm.learningWord.value,
      familiarWord: wordForm.familiarWord.value,
    })
    .catch(function (err) {
      console.log(err);
    });
});
