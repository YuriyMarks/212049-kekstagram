'use strict';

// Отрисовка галереи картинок.

var comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureTemplate = document.querySelector('#picture-template').content;
var pictureTemplateList = document.querySelector('.pictures');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var photosArraySize = 25;

/**
  * Вычисляет случайное целое число из диапазона
  *
  * @param {number} min минимальное число из диапазона
  * @param {number} max максимальное число из диапазона
  * @return {number} temp возвращает случайное целое число из диапазона
*/
var calcRandomNum = function (min, max) {
  var temp = Math.floor(Math.random() * (max - min + 1)) + min;

  return temp;
};

/**
  * Конкатенирует url фотографии
  *
  * @param {number} i переменная цикла
  * @return {string} photoUrl возвращает url фотографии
*/
var createUrl = function (i) {
  var photoUrl = 'photos/' + parseInt(i + 1, 10) + '.jpg';

  return photoUrl;
};

/**
  * Добавляет в массив сгенерированные JS объекты, которые
  * будут описывать фотографии, размещенные другими пользователями
*/
var createArrayOfPhotosDescription = function () {
  var photosDescription = [];

  for (var i = 0; i < photosArraySize; i++) {
    var photoDescript = {
      url: createUrl(i),
      likes: calcRandomNum(15, 200),
      comments: comments[calcRandomNum(0, comments.length - 1)],
    };
    photosDescription[i] = photoDescript;
  }
  createPhotoElement(photosDescription);
};

/**
  * Клонирует обьект из template подставляет значения url и описание
  * картинки и сохраняет во fragment
  *
  * @param {array} arr массив фотографий photosDescription
*/
var createPhotoElement = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var pictureTemplateElement = pictureTemplate.cloneNode(true);

    pictureTemplateElement.querySelector('.picture img').src = arr[i].url;
    pictureTemplateElement.querySelector('.picture-likes').textContent = arr[i].likes;
    pictureTemplateElement.querySelector('.picture-comments').textContent = arr[i].comments;

    fragment.appendChild(pictureTemplateElement);
  }
  createPhotosList(fragment);
};

/**
  * Отрисовывает сгенерированные DOM-элементы в блок .pictures
  *
  * @param {array} fragment массив фотографий photosDescription
*/
var createPhotosList = function (fragment) {
  var pictures =  document.querySelector('.pictures');

  pictureTemplateList.appendChild(fragment);
  pictures.classList.remove('hidden');
};

createArrayOfPhotosDescription();

// Показ/скрытие картинки в галерее.

var galeryOverlay = document.querySelector('.gallery-overlay');
var galeryOverlayClose = document.querySelector('.gallery-overlay-close');

/**
  * При нажатии на любой из элементов .picture отрисовывает элемент
  * .gallery-overlay с подробным описанием картинки
  *
  * @param {object} evt обьект .picture
*/
var pictureClickHandler = function (evt) {
  evt.preventDefault();

  var temp = evt.currentTarget;
  var galeryOverlayImage = document.querySelector('.gallery-overlay-image');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');

  galeryOverlayImage.src = temp.querySelector('img').src;
  likesCount.textContent = temp.querySelector('.picture-likes').textContent;
  commentsCount.textContent = temp.querySelector('.picture-comments').textContent;
  galeryOverlay.classList.remove('hidden');
};

/**
  * Добавляет обработчик события 'click' на все элементы .picture
*/
var addEventHandler = function () {
  var pictures = document.querySelectorAll('.picture');
  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', pictureClickHandler);
  }
  galeryOverlayClose.addEventListener('click', closeGalleryOverlay);
  galeryOverlayClose.addEventListener('keydown', onGalleryOverlayEnterPress);
  document.addEventListener('keydown', onGalleryOverlayEscPress);
};

/**
  * При клике на элемент .gallery-overlay-close скрывает элемент .gallery-overlay
*/
var closeGalleryOverlay = function () {
  galeryOverlay.classList.add('hidden');
};

/**
  * При фокусировке на обьекте .gallery-overlay-close и нажатии клавиши
  * enter скрывает картинку .gallery-overlay
*/
var onGalleryOverlayEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE){
      closeGalleryOverlay();
  }
};

/**
  * При нажатии клавиши esc скрывает картинку .gallery-overlay
*/
var onGalleryOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE){
    if (document.activeElement != formDescription) {
      closeGalleryOverlay();
    }
  }
};

addEventHandler();

// Показ/скрытие формы кадрирования

var formDescription = document.querySelector('.upload-form-description');
var uploadForm = document.querySelector('#upload-file');
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
}

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
*/
var onUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE){
    if (document.activeElement != formDescription) {
      closeUploadOverlay(evt);
    }
  }
};

uploadForm.addEventListener('change', openUploadOverlay);

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
  styleTransform.style.transform = 'scale('+zoomValueNumber+')';

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
var compareHashtags= function (arr) {

  for (var i = 0; i < arr.length; i++){
    var temp = arr[i].toLowerCase();

    for(var j = i + 1; j < arr.length; j++){
      var temp1 = arr[j].toLowerCase();

      if (temp === temp1) {
        return true;
      }
    }
  }
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

uploadForm.addEventListener('submit', function(evt) {
  var formHashtagsValue = uploadHashtags.value;
  if (!validateHashtagForm(formHashtagsValue)) {
    evt.preventDefault();
    uploadHashtags.style.border = "2px solid red";
  }
});
