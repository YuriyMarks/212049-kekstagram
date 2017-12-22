'use strict';

(function () {

  window.save = function (data, onSuccess, onError) {
    var SERVER_URL = 'https://1510.dump.academy/kekstagram';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за: ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  window.load = function (onLoad, onError) {
    var SERVER_URL = 'https://1510.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', SERVER_URL);

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за: ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;

    xhr.send();
  };
})();
