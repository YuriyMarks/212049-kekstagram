'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;
  var formDescription = document.querySelector('.upload-form-description');

  /**
    * При нажатии клавиши esc скрывает картинку
    *
    * @param {object} evt обьект
    * @param {function} action функция обработки события
  */
  var onEscPress = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.activeElement !== formDescription) {
        action();
      }
    }
  };

  /**
    * При фокусировке на обьекте  и нажатии клавиши
    * enter скрывает картинку
    *
    * @param {object} evt обьект
    * @param {function} action функция обработки события
  */
  var onEnterPress = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  /**
    * Выполняет функцию указанную в первом аргументе, асинхронно,
    * с задержкой
    *
    * @param {function} f функция
  */
  var debounce = function (f) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(f, DEBOUNCE_INTERVAL);
  };

   /**
    * В случае успешной отправки\приема данных с сервера вызывает функцию обратного вызова,
    * в случае неуспешной отправки\приема данных выводит ошибку на экран пользователя
    *
    * @param {object} obj обьект
    * @param {function} onSuccess функция обратного вызова
    * @param {function} onError функция обратного вызова
  */
  var transferDataHandler = function (obj, onSuccess, onError) {
    obj.addEventListener('load', function () {
      obj.status === 200 ? onSuccess(obj.response): onError('Неизвестный статус: ' + obj.status + ' ' + obj.statusText);
    });

    obj.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    obj.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за: ' + obj.timeout + ' мс ');
    });

    obj.timeout = 10000;
  };

  window.util = {
    onEscPress: onEscPress,
    onEnterPress: onEnterPress,
    debounce: debounce,
    transferDataHandler: transferDataHandler
  };
})();
