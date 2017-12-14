'use strict';

// Показ/скрытие формы кадрирования

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var previewImage = uploadOverlay.querySelector('.effect-image-preview');
  var uploadFormClose = document.querySelector('.upload-form-cancel');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var pictureScaleIncrease = document.querySelector('.upload-resize-controls-button-inc');
  var pictureScaleDecrease = document.querySelector('.upload-resize-controls-button-dec');
  var uploadHashtags = document.querySelector('.upload-form-hashtags');
  var uploadForm = document.querySelector('.upload-form');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var currentEffectName;
  var zoomStep = 25;
  var maxZoom = 100;
  var minZoom = 25;

  /**
    * При изменении значения поля загрузки фотографии показывает
    * форму кадрирования (элемент .upload-overlay)
  */
  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    uploadEffectLevel.classList.add('hidden');
    uploadFormClose.addEventListener('click', closeUploadOverlay);
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  /**
    * При клике скрывает форму кадрирования (элемент .upload-overlay)
  */
  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadFormClose.removeEventListener('click', closeUploadOverlay);
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  /**
    * При нажатии клавиши esc скрывает форму кадрирования (элемент .upload-overlay)
    *
    * @param {object} evt обьект .document
  */
  var onUploadOverlayEscPress = function (evt) {
    window.util.onEscPress(evt, closeUploadOverlay);
  };

  uploadFile.addEventListener('change', openUploadOverlay);

  /**
    * Добавляет картинке .effect-image-preview CSS-класс, соответствующий фильтру
    *
    * @param {object} evt обьект .upload-effect-label
  */
  var addFilterToImage = function (evt) {
    if (evt.target.tagName === 'INPUT') {
      var currentEffectControl = evt.target.value;
      if (previewImage.classList.contains(currentEffectName)) {
        previewImage.classList.remove(currentEffectName);
      }
      currentEffectName = 'effect-' + currentEffectControl;
      previewImage.classList.add(currentEffectName);
      uploadEffectLevel.classList.remove('hidden');
    }
  };

  uploadEffectControls.addEventListener('click', addFilterToImage);

  /**
    * Изменяет масштаб изображения .effect-image-preview
    *
    * @param {number} zoomValueNumber значение атрибута value обьекта
    * .upload-resize-controls-value
  */
  var changeScalePicture = function (zoomValueNumber) {
    var styleTransform = document.querySelector('.effect-image-preview');
    styleTransform.style.transform = 'scale(' + zoomValueNumber + ')';

    changeZoomValue(zoomValueNumber * 100 + '%');
  };

  /**
    * Изменяет значение атрибута value обьекта .upload-resize-controls-value
    *
    * @param {number} value значение атрибута value в процентах
  */
  var changeZoomValue = function (value) {
    var atributeValue = document.querySelector('.upload-resize-controls-value');
    atributeValue.value = value;
  };

  /**
    * При нажатии на кнопку масштабирования увеличивает значение
    * масштаба zoomValueNumber с шагом в 25
  */
  var zoom = function () {
    var zoomValue = document.querySelector('.upload-resize-controls-value').value;
    var zoomValueNumber = parseInt(zoomValue, 10);

    if (zoomValueNumber !== maxZoom) {
      zoomValueNumber = (zoomValueNumber + zoomStep) / 100;
      changeScalePicture(zoomValueNumber);
    }
  };

  /**
    * При нажатии на кнопку масштабирования уменьшает значение
    * масштаба zoomValueNumber с шагом в 25
  */
  var unzoom = function () {
    var zoomValue = document.querySelector('.upload-resize-controls-value').value;
    var zoomValueNumber = parseInt(zoomValue, 10);

    if (zoomValueNumber !== minZoom) {
      zoomValueNumber = (zoomValueNumber - zoomStep) / 100;
      changeScalePicture(zoomValueNumber);
    }
  };

  pictureScaleIncrease.addEventListener('click', zoom);
  pictureScaleDecrease.addEventListener('click', unzoom);

  /**
    * Проходится по массиву и сравнивает содержимое
    * на наличие дубликатов, возвращает true если находит дубликат
    *
    * @param {array} arr массив хештегов введенных пользователем
    * @return {boolean} true
  */
  var compareHashtags = function (arr) {

    for (var i = 0; i < arr.length; i++) {
      var temp = arr[i].toLowerCase();

      for (var j = i + 1; j < arr.length; j++) {
        var temp1 = arr[j].toLowerCase();

        if (temp === temp1) {
          return true;
        }
      }
    }
    return false;
  };

  /**
    * Осуществляет проверку на валидность введенных хештегов пользователем
    *
    * @param {String} params строка состоящая из введенных пользователем хештегов
    * @return {boolean} formValid
  */
  var validateHashtagForm = function (params) {
    var formValid = true;
    var splittedFormHashtags = params.split(' ');

    if (compareHashtags(splittedFormHashtags)) {
      return false;
    }

    if (!params) {
      return true;
    }

    if (splittedFormHashtags.length > 5) {
      return false;
    }

    var hashtagsItem;

    for (var i = 0; i < splittedFormHashtags.length; i++) {

      hashtagsItem = splittedFormHashtags[i];

      if (hashtagsItem[0] !== '#') {
        formValid = false;
      }

      if (hashtagsItem.length > 19) {
        formValid = false;
      }
    }
    return formValid;
  };

  uploadForm.addEventListener('submit', function (evt) {
    var formHashtagsValue = uploadHashtags.value;
    if (!validateHashtagForm(formHashtagsValue)) {
      evt.preventDefault();
      uploadHashtags.style.border = '2px solid red';
    }
  });

  // Добавляет движение ползунка и реакцию на движение ползунка
  // изменением насыщенности текущего выбранного фильтра

  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');

  effectLevelPin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var step = (parseInt(shift.x, 10) * 100 / 455);
      var temp = (parseInt(effectLevelPin.style.left, 10) - step);

      if (temp > 0 && temp < 100) {
        effectLevelPin.style.left = Math.round(temp) + '%';
        effectLevelVal.style.width =  Math.round(temp) + '%';

      if (previewImage.classList.contains('effect-chrome')) {
        var step = (parseInt(shift.x, 10) * (1 / 455));
        var temp = previewImage.style.filter - step;
        previewImage.style.filter = 'grayscale(' + temp + ')';
      }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
