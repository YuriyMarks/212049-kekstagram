(function () {
  var pictureScaleIncrease = document.querySelector('.upload-resize-controls-button-inc');
  var pictureScaleDecrease = document.querySelector('.upload-resize-controls-button-dec');
  var zoomStep = 25;
  var maxZoom = 100;
  var minZoom = 25;

    /**
    * При нажатии на кнопку масштабирования увеличивает/уменьшает значение
    * масштаба zoomValueNumber с шагом в 25
    */
    window.initializeScale = function (param, callback) {
      var temp = param.path[1].querySelector('.upload-resize-controls-value').value;
      var zoomValueNumber = parseInt(temp, 10);

      if (param.target.classList.contains('upload-resize-controls-button-inc')) {
        if (zoomValueNumber !== maxZoom) {
          zoomValueNumber = (zoomValueNumber + zoomStep) / 100;

          if (typeof callback === 'function') {
            callback(zoomValueNumber);
          }
        }
      }

      if (param.target.classList.contains('upload-resize-controls-button-dec')) {
        if (zoomValueNumber !== minZoom) {
          zoomValueNumber = (zoomValueNumber - zoomStep) / 100;

          if (typeof callback === 'function') {
            callback(zoomValueNumber);
          }
        }
      }
    };

  pictureScaleIncrease.addEventListener('click', window.initializeScale);
  pictureScaleDecrease.addEventListener('click', window.initializeScale);
})();
