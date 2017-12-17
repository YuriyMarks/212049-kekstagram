(function () {
  var pictureScaleIncrease = document.querySelector('.upload-resize-controls-button-inc');
  var pictureScaleDecrease = document.querySelector('.upload-resize-controls-button-dec');
  var zoomStep = 25;
  var maxZoom = 100;
  var minZoom = 25;

  window.initializeScale = {

    /**
    * При нажатии на кнопку масштабирования увеличивает/уменьшает значение
    * масштаба zoomValueNumber с шагом в 25
    */
    adjustScale: function (param, callback) {
      var zoomValueNumber = parseInt(param.value, 10);
console.log(param);
      //if (param.classList.contains('upload-resize-controls-button-inc')) {
        if (zoomValueNumber !== maxZoom) {
          zoomValueNumber = (zoomValueNumber + zoomStep) / 100;
        }
      //}

      if (param.target === 'upload-resize-controls-button-dec') {
        if (zoomValueNumber !== minZoom) {
          zoomValueNumber = (zoomValueNumber - zoomStep) / 100;
        }
      }

      if (typeof callback === 'function') {
        callback(zoomValueNumber);
      }
    }
  };
  pictureScaleIncrease.addEventListener('click', window.initializeScale.adjustScale);
  pictureScaleDecrease.addEventListener('click', window.initializeScale.adjustScale);
})();
