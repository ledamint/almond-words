/* eslint-disable */
var familiarLanguage;
var learningLanguage;

function setUserLanguages() {
  return axios.get('http://almondwords.com/user')
    .then(function (res) {
      familiarLanguage = res.data.familiarLanguage;
      learningLanguage = res.data.learningLanguage;
    });
}

setUserLanguages();

chrome.extension.onRequest.addListener(function (wordData, MessageSender) {
  axios.post('http://almondwords.com/words', wordData)
    .then(function (res) {
      chrome.tabs.sendRequest(MessageSender.tab.id, true);
    })
    .catch(function (error) {
      chrome.tabs.sendRequest(MessageSender.tab.id, false);
    });
});

function translateWord(word) {
  const apiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  const apiKey = 'trnsl.1.1.20170910T052245Z.2dcffa636619250a.1ae7a58bd70134c42f7ab907150584f2ed488d8f';

  if (familiarLanguage === undefined) {
    return setUserLanguages()
      .then(function () {
        return axios.get(
          `${apiUrl}?key=${apiKey}&text=${word}&lang=${learningLanguage}-${familiarLanguage}`);
      });
  } else {
    return axios.get(
      `${apiUrl}?key=${apiKey}&text=${word}&lang=${learningLanguage}-${familiarLanguage}`);
  }
}

chrome.runtime.onMessage.addListener(function (message, MessageSender, sendAnswer) {
  if (message === 'lang') {
    sendAnswer({familiarLanguage, learningLanguage})
  } else if (typeof message === 'string' && message.length <= 30) {
    translateWord(message)
      .then(function (res)  {
          chrome.tabs.sendMessage(MessageSender.tab.id, res.data.text[0]);
        })
      .catch(function (err) {
        chrome.tabs.sendMessage(MessageSender.tab.id, err);
      });
  }
});
