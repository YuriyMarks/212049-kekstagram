'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var formDescription = document.querySelector('.upload-form-description');

  window.util = {
    /**
      * При нажатии клавиши esc скрывает картинку
      *
      * @param {object} evt обьект
      * @param {function} action функция обработки события
    */
    onEscPress: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        if (document.activeElement !== formDescription) {
          action();
        }
      }
    },

    /**
      * При фокусировке на обьекте  и нажатии клавиши
      * enter скрывает картинку
      *
      * @param {object} evt обьект
      * @param {function} action функция обработки события
    */
    onEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
