'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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

  window.util = {
  onEscPress: onEscPress,
  onEnterPress: onEnterPress
 };
})();
