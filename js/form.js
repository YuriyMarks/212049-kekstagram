'use strict';

// Показ/скрытие формы кадрирования

(function () {
  var formDescription = document.querySelector('.upload-form-description');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var previewImage = uploadOverlay.querySelector('.effect-image-preview');
  var uploadFormClose = document.querySelector('.upload-form-cancel');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var pictureScaleIncrease = document.querySelector('.upload-resize-controls-button-inc');
  var pictureScaleDecrease = document.querySelector('.upload-resize-controls-button-dec');
  var uploadHashtags = document.querySelector('.upload-form-hashtags');
  var uploadForm = document.querySelector('.upload-form');
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
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.activeElement !== formDescription) {
        closeUploadOverlay(evt);
      }
    }
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
})();
