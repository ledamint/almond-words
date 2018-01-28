/* eslint-disable */

function removePopup() {
  var awNewWord = document.getElementById('aw-new-word');

  document.body.removeChild(awNewWord);
}

function onAdding(isSuccess) {
  document.querySelector('.aw-submit').textContent = isSuccess ? 'Success' : 'Error';

  setTimeout(removePopup, 1000);
}

function sendRequest(e) {
  e.preventDefault();

  chrome.extension.sendRequest({
    learningWord: document.getElementById('aw-learning-word').value,
    familiarWord: document.getElementById('aw-familiar-word').value
  });
};

chrome.extension.onRequest.addListener(function (isSuccess) {
  onAdding(isSuccess);
});

document.addEventListener('mouseup', function (e) {
  if (e.target.closest('#aw-new-word')) return;

  var awNewWord = document.getElementById('aw-new-word');

  if (awNewWord !== null) document.body.removeChild(awNewWord);

  var selection = window.getSelection().toString();

  if (selection.trim() !== '') {
    chrome.runtime.sendMessage(null, selection);

    // TODO change ru to different languages
    var popup = `
        <form method="post" name="word">
            <input id="aw-learning-word" type="text" name="learningWord" value="${selection}">
            <input id="aw-familiar-word" type="text" name="familiarWord">
            <a class="aw-yandex-logo" target="_blank"
            href="https://translate.yandex.com/?lang=ru&text=${selection}"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="14" viewBox="0 0 100 43"><g fill="none" fill-rule="evenodd"><path d="M29.902 32.006c-.58.902-1.698 1.639-2.818 1.639-1.656 0-2.444-1.558-2.444-3.933 0-2.661.87-4.422 4.89-4.422h.373v6.716zm3.19-.614v-9.706c0-4.997-2.03-6.553-5.717-6.553-2.113 0-4.02.86-4.972 1.638l.62 2.825c1.078-.941 2.487-1.802 4.145-1.802 1.823 0 2.735 1.147 2.735 3.85v1.229h-.457c-5.842 0-8.12 2.785-8.12 7.208 0 4.055 2.03 6.267 5.013 6.267 1.823 0 2.984-.779 3.895-1.926h.208a9.61 9.61 0 0 0 .29 1.638h2.735a29.279 29.279 0 0 1-.374-4.668zm7.253-11.345c.746-1.024 1.906-2.048 3.273-2.048 1.243 0 1.948.532 1.948 2.09V36.06h3.273V19.8c0-3.152-1.45-4.667-4.185-4.667-1.948 0-3.522 1.27-4.102 2.047h-.207v-1.802h-3.233V36.06h3.233V20.047zM62.14 34.422h.208l.248 1.638H65V7.105h-3.233v8.806c-.62-.45-1.656-.778-2.65-.778-4.186 0-7.087 3.727-7.087 11.386 0 6.39 2.237 9.83 6.34 9.83 1.7 0 2.859-.779 3.771-1.926zm-.374-2.375c-.538.82-1.408 1.598-3.025 1.598-2.361 0-3.273-2.949-3.273-7.782 0-4.218 1.243-8.11 3.854-8.11 1.077 0 1.782.328 2.444.984v13.31zm18.44 2.621l-.746-2.457c-.828.573-2.154 1.392-3.978 1.392-2.569 0-3.895-2.457-3.895-7.126h8.703v-1.76c0-7.005-2.28-9.584-5.76-9.584-4.434 0-6.299 4.832-6.299 11.467 0 6.348 2.652 9.748 6.962 9.748 2.072 0 3.687-.656 5.014-1.68zM74.53 17.754c1.865 0 2.445 2.58 2.445 6.102h-5.346c.208-3.686.912-6.102 2.901-6.102zm16.658-2.336l-2.859 7.495-2.693-7.495H82.28l3.936 9.953-4.352 10.69h3.191l3.15-8.52 3.231 8.52h3.357l-4.351-10.976 3.896-9.666h-3.15z" fill="#000"/><path d="M15.731 36.06V25.7l7.755-21.737h-3.422l-5.908 17.314L9.08 7.094H5.341l7.116 18.482V36.06z" fill="red"/></g><AutoScroll xmlns="http://www.w3.org/1999/xhtml"></AutoScroll></svg></a>
            <button class="aw-submit" type="submit">Add</button>
        </form>
    `;
    var element = document.createElement('div');
    element.innerHTML = popup;
    element.setAttribute('id', 'aw-new-word');
    element.style.position = 'absolute';
    element.style.top = e.pageY - 120 + 'px';
    element.style.left = e.pageX - 50 + 'px';
    element.onsubmit = sendRequest;

    document.body.appendChild(element);
  }
});

chrome.runtime.onMessage.addListener(function (translatedWord) {
  if (typeof translatedWord === 'string') {
    document.getElementById('aw-familiar-word').value = translatedWord;
  }
})
