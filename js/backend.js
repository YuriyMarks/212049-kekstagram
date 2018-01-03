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

    window.util.transferDataHandler(xhr, onSuccess, onError);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  /**
    * Загружает данные с сервера
    *
    * @param {function} onLoad функция обратного вызова, для обработки успешной загрузки данных с сервера
    * @param {function} onError функция обратного вызова, для обработки ошибок загрузки данных с сервера
  */
  var load = function (onLoad, onError) {
    var SERVER_URL = 'https://1510.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', SERVER_URL);

    window.util.transferDataHandler(xhr, onLoad, onError);

    xhr.send();
  };

  window.backend = {
    save: save,
    load: load
  };
})();
