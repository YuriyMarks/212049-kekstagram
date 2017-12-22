'use strict';

// Показ/скрытие формы кадрирования

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var previewImage = uploadOverlay.querySelector('.effect-image-preview');
  var uploadFormClose = document.querySelector('.upload-form-cancel');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var uploadHashtags = document.querySelector('.upload-form-hashtags');
  var uploadForm = document.querySelector('.upload-form');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var scaleElement = document.querySelector('.upload-resize-controls-value');
  var pictureScaleButtons = document.querySelectorAll('.upload-resize-controls-button');
  var oldEffectName;

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
    * @param {String} currentEffectName строка - класс CSS фильтра который накладывается на картинку
  */
  var addFilterToImage = function (currentEffectName) {
    previewImage.classList.remove(oldEffectName);
    previewImage.classList.add(currentEffectName);
    oldEffectName = currentEffectName;


    uploadEffectLevel.classList.remove('hidden');
    previewImage.removeAttribute('style');
    effectLevelPin.style.left = '100%';
    effectLevelVal.style.width = '100%';
    scaleElement.value = '100%';


    if (previewImage.classList.contains('effect-none')) {
      uploadEffectLevel.classList.add('hidden');
    }
  };

  uploadEffectControls.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      window.changeFilter(evt.target.value, addFilterToImage);
    }
  });

  /**
    * Изменяет масштаб изображения .effect-image-preview
    *
    * @param {number} zoomValueNumber значение атрибута value обьекта
    * .upload-resize-controls-value
  */
  var adjustScale = function (zoomValueNumber) {
    zoomValueNumber = zoomValueNumber / 100;
    previewImage.style.transform = 'scale(' + zoomValueNumber + ')';
    scaleElement.value = zoomValueNumber * 100 + '%';
  };

  for (var i = 0; i < pictureScaleButtons.length; i++) {
    pictureScaleButtons[i].addEventListener('click', function (evt) {
      window.initializeScale(evt.currentTarget, scaleElement.value, adjustScale);
    });
  }

  /**
    * Проходится по массиву и сравнивает содержимое
    * на наличие дубликатов, возвращает true если находит дубликат
    *
    * @param {array} arr массив хештегов введенных пользователем
    * @return {boolean} true
  */
  var compareHashtags = function (arr) {

    for (i = 0; i < arr.length; i++) {
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

    for (i = 0; i < splittedFormHashtags.length; i++) {

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

    else {

      var loadData = function () {
        uploadOverlay.classList.add('hidden');

        if (!uploadFile.value == '') {
          uploadFile.value = '';
        }
      };

      var errorHandler = function (message) {
        var node = document.createElement('div');
        node.style = 'z-index: 10; margin: 0 auto; padding-top: 25px; text-align: center; background-color: rgba(255, 0, 0, 0.9); border: 2px solid firebrick;';
        node.style.position = 'absolute';
        node.style.left = 'calc(50% - 225px)';
        node.style.top = '100px';
        node.style.width = '450px';
        node.style.height = '50px';
        node.style.fontSize = '20px';
        node.style.color = 'black';

        node.textContent = message;
        document.body.insertAdjacentElement('afterbegin', node);
      };

      window.save(new FormData(uploadForm), loadData, errorHandler);

      evt.preventDefault();
    }
  });

  // Добавляет движение ползунка и реакцию на движение ползунка
  // изменением насыщенности текущего выбранного фильтра

  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');

  effectLevelPin.addEventListener('mousedown', function (evt) {
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

      if (temp >= 0 && temp <= 100) {
        effectLevelPin.style.left = Math.round(temp) + '%';
        effectLevelVal.style.width = Math.round(temp) + '%';
      }

      if (previewImage.classList.contains('effect-chrome')) {
        temp = (temp / 100).toFixed(1);
        previewImage.style.filter = 'grayscale(' + temp + ')';
      }

      if (previewImage.classList.contains('effect-sepia')) {
        temp = (temp / 100).toFixed(1);
        previewImage.style.filter = 'sepia(' + temp + ')';
      }

      if (previewImage.classList.contains('effect-marvin')) {
        temp = temp.toFixed(0) + '%';
        previewImage.style.filter = 'invert(' + temp + ')';
      }

      if (previewImage.classList.contains('effect-phobos')) {
        temp = (temp / 30).toFixed(1) + 'px';
        previewImage.style.filter = 'blur(' + temp + ')';
      }

      if (previewImage.classList.contains('effect-heat')) {
        temp = (temp / 30).toFixed(1);
        previewImage.style.filter = 'brightness(' + temp + ')';
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
