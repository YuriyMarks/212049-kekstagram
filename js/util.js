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

  window.util = {
    onEscPress: onEscPress,
    onEnterPress: onEnterPress,
    debounce: debounce
  };
})();
