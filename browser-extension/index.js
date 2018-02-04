/* eslint-disable */

axios.post('http://almondwords.com/login')
  .then(function (res) {
    if (res.data) {
      document.body.querySelector('.content').innerHTML =
        '<p class="login success">You have already logged in to <a href="http://almondwords.com" target="_blank">almondwords</a> and can add new words</p>';
    } else {
      document.body.querySelector('.content').innerHTML =
        '<p class="login error">Please log in to <a href="http://almondwords.com" target="_blank">almondwords</a></p>';
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
