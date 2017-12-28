'use strict';

(function () {

  /**
    * Загружает данные на сервер
    *
    * @param {object} data данные загружаемые на сервер
    * @param {function} onSuccess функция обратного вызова, для обработки успешной загрузки данных на сервер
    * @param {function} onError функция обратного вызова, для обработки ошибок загрузки данных на сервер
  */
  var save = function (data, onSuccess, onError) {
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

   /**
    * Загружает данные с сервера
    *
    * @param {function} onSuccess функция обратного вызова, для обработки успешной загрузки данных с сервера
    * @param {function} onError функция обратного вызова, для обработки ошибок загрузки данных с сервера
  */
  var load = function (onLoad, onError) {
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

  window.save = save;
  window.load = load;
})();
