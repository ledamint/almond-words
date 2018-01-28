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


function translateWord(word) {
  const apiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  const apiKey = 'trnsl.1.1.20170910T052245Z.2dcffa636619250a.1ae7a58bd70134c42f7ab907150584f2ed488d8f';

  return axios.get(
    `${apiUrl}?key=${apiKey}&text=${word}&lang=ru`);
}

chrome.runtime.onMessage.addListener(function (word, MessageSender) {
  translateWord(word)
    .then(
      (res) => {
        chrome.tabs.sendMessage(MessageSender.tab.id, res.data.text[0]);
      })
    .catch((err) => {
      chrome.tabs.sendMessage(MessageSender.tab.id, err);
    })
});
