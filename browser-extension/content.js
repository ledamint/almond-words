/* eslint-disable */

function sendRequest(e) {
  e.preventDefault();

  chrome.extension.sendRequest({
    learningWord: document.getElementById('aw-learning-word').value,
    familiarWord: document.getElementById('aw-familiar-word').value
  });
};

document.addEventListener('mouseup', function (e) {
  if (e.target.closest('#aw-new-word')) return;

  var awNewWord = document.getElementById('aw-new-word');

  if (awNewWord !== null) document.body.removeChild(awNewWord);

  var selection = window.getSelection().toString();

  if (selection !== '') {
    var popup = `
        <form method="post" name="word">
            <input id="aw-learning-word" type="text" name="learningWord" value="${selection}">
            <input id="aw-familiar-word" type="text" name="familiarWord">
            <button type="submit">Submit</button>
        </form>
    `;
    var element = document.createElement('div');
    element.innerHTML = popup;
    element.setAttribute('id', 'aw-new-word');
    element.style.position = 'absolute';
    element.style.top = e.pageY - 30 + 'px';
    element.style.left = e.pageX + 'px';
    element.onsubmit = sendRequest;

    document.body.appendChild(element);
  }
});