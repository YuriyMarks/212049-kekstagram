'use strict';

(function () {

  /**
    * Создает строку соответствующую фильтру CSS
    *
    * @param {String} currentEffectControl изменяемый параметр
    * @param {function} callback функция обратного вызова
  */
  var changeFilter = function (currentEffectControl, callback) {
    var currentEffectName = 'effect-' + currentEffectControl;

    if (typeof callback === 'function') {
      callback(currentEffectName);
    }
  };

  window.changeFilter = changeFilter;
})();
