/* eslint-disable */

axios.post('http://almondwords.com/login')
    .then(function (res) {
      if (res.data) {
        document.body.removeChild(document.querySelector('.error'));
      } else {
        document.body.removeChild(document.querySelector('.success'));
      }
    })
    .catch(function (err) {
      document.body.removeChild(document.querySelector('.success'));
    });

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
