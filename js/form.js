'use strict';

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
  var effectLevelPin = document.querySelector('.upload-effect-level-pin');
  var effectLevelVal = document.querySelector('.upload-effect-level-val');
  var oldEffectName;

  /**
    * При изменении значения поля загрузки фотографии показывает
    * форму кадрирования (элемент .upload-overlay)
  */
  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    uploadEffectLevel.classList.add('hidden');
    uploadFormClose.addEventListener('click', closeUploadOverlay);
    document.addEventListener('keydown', pressEscOnUploadOverlay);
  };

  /**
    * При клике скрывает форму кадрирования (элемент .upload-overlay)
  */
  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadFormClose.removeEventListener('click', closeUploadOverlay);
    document.removeEventListener('keydown', pressEscOnUploadOverlay);
  };

  /**
    * При нажатии клавиши esc скрывает форму кадрирования (элемент .upload-overlay)
    *
    * @param {object} evt обьект .document
  */
  var pressEscOnUploadOverlay = function (evt) {
    window.util.pressEsc(evt, closeUploadOverlay);
  };

  uploadFile.addEventListener('change', openUploadOverlay);

  /**
    * Добавляет картинке .effect-image-preview CSS-класс, соответствующий фильтру
    *
    * @param {String} currentEffectName строка - класс CSS фильтра который накладывается на картинку
  */
  var addFilterToImage = function (currentEffectName) {
    window.temp = currentEffectName;
    previewImage.classList.remove(oldEffectName);
    previewImage.classList.add(currentEffectName);
    oldEffectName = currentEffectName;


    uploadEffectLevel.classList.remove('hidden');
    previewImage.style.filter = '';
    effectLevelPin.style.left = '100%';
    effectLevelVal.style.width = '100%';

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
      var temp1 = arr[i].toLowerCase();

      for (var j = i + 1; j < arr.length; j++) {
        var temp2 = arr[j].toLowerCase();

        if (temp1 === temp2) {
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

      if (hashtagsItem.length > 19 || hashtagsItem.length < 2) {
        formValid = false;
      }
    }
    return formValid;
  };

  /**
    * Обрабатывает событие нажатия кнопки отправки формы
    *
    * @param {object} evt обьект .upload-form
  */
  var submitForm = function (evt) {

    var formHashtagsValue = uploadHashtags.value;

    if (!validateHashtagForm(formHashtagsValue)) {
      evt.preventDefault();
      uploadHashtags.style.border = '2px solid red';
    } else {
      uploadHashtags.style.border = '2px solid transparent';
      var loadData = function () {
        uploadOverlay.classList.add('hidden');

        if (!uploadFile.value === '') {
          uploadFile.value = '';
        }
        uploadForm.reset();
        previewImage.classList.remove(window.temp);
        previewImage.style.filter = '';
        previewImage.style.transform = 'scale(1)';
      };

      var handleError = function (message) {
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

      window.backend.save(new FormData(uploadForm), loadData, handleError);

      evt.preventDefault();
    }
  };

  uploadForm.addEventListener('submit', submitForm);

  /**
    * Добавляет движение ползунка и реакцию на движение ползунка изменением
    * насыщенности текущего выбранного фильтра
    *
    * @param {object} evt обьект .upload-effect-level-pin
  */
  var handleSlider = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var moveMouse = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var step = (parseInt(shift.x, 10) * 100 / 455);
      var tempStyleLeft = (parseInt(effectLevelPin.style.left, 10) - step);
      // var tempStyleLeft1 = (tempStyleLeft / 100).toFixed(1);
      // var tempStyleLeft3 = (tempStyleLeft / 30).toFixed(1);
      // var tempStyleLeft100 = tempStyleLeft.toFixed(0) + '%';
      var currentFilter = previewImage.classList;

      if (tempStyleLeft >= 0 && tempStyleLeft <= 100) {
        effectLevelPin.style.left = Math.round(tempStyleLeft) + '%';
        effectLevelVal.style.width = Math.round(tempStyleLeft) + '%';
      }

      var filter = {
        'effect-chrome': 'grayscale(' + (tempStyleLeft / 100).toFixed(1) + ')',
        'effect-sepia': 'sepia(' + (tempStyleLeft / 100).toFixed(1) + ')',
        'effect-marvin': 'invert(' + tempStyleLeft.toFixed(0) + '%' + ')',
        'effect-phobos': 'blur(' + (tempStyleLeft / 30).toFixed(1) + 'px' + ')',
        'effect-heat': 'brightness(' + (tempStyleLeft / 30).toFixed(1) + ')'
      };

      var levelFilter = filter[currentFilter[1]];
      previewImage.style.filter = levelFilter;
    };

    var upMouse = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseup', upMouse);
    };

    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', upMouse);
  };

  effectLevelPin.addEventListener('mousedown', handleSlider);
})();
