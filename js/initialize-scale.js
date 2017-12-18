'use strict';

(function () {
  var zoomStep = 25;
  var maxZoom = 100;
  var minZoom = 25;

  /**
  * При нажатии на элементы управления увеличивает/уменьшает значение
  * переданное в качестве параметра с шагом в 25
  *
  * @param {object} button элемент управления
  * @param {number} scaleValue изменяемое значение переданное в качестве параметра
  * @param {function} callback функция обратного вызова
  */
  window.initializeScale = function (button, scaleValue, callback) {
    var zoomValueNumber = parseInt(scaleValue, 10);

    if (button.classList.contains('upload-resize-controls-button-inc')) {
      if (zoomValueNumber !== maxZoom) {
        zoomValueNumber = (zoomValueNumber + zoomStep);

        if (typeof callback === 'function') {
          callback(zoomValueNumber);
        }
      }
    }

    if (button.classList.contains('upload-resize-controls-button-dec')) {
      if (zoomValueNumber !== minZoom) {
        zoomValueNumber = (zoomValueNumber - zoomStep);

        if (typeof callback === 'function') {
          callback(zoomValueNumber);
        }
      }
    }
  };
})();
