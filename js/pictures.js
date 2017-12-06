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
  * @return {string} photoUrl url фотографии
*/
var createUrl = function (i) {
  var photoUrl = 'photos/' + parseInt(i + 1, 10) + '.jpg';

  return photoUrl;
};

/**
  * Добавляет в массив сгенерированные JS объекты, которые будут описывать фотографии, размещенные другими пользователями
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
  * Клонирует обьект из template подставляет значения url и описание картинки и сохраняет во fragment
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

var galeryOverlayClose = document.querySelector('.gallery-overlay-close');

/**
  * При нажатии на любой из элементов .picture отрисовывает элемент .gallery-overlay с подробным описанием картинки
  *
  * @param {object} evt обьект .picture
*/
var pictureClickHandler = function (evt) {
  evt.preventDefault();

  var temp = evt.currentTarget;
  var galeryOverlayImage = document.querySelector('.gallery-overlay-image');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var galeryOverlay = document.querySelector('.gallery-overlay');

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
};

/**
  * При нажатии на элементы .gallery-overlay-close, либо при нажатии клавиши ESC скрывает элемент .gallery-overlay
*/
var closeGalleryOverlay = function () {
  var galeryOverlay = document.querySelector('.gallery-overlay');
  galeryOverlay.classList.add('hidden');
};

galeryOverlayClose.addEventListener('click', closeGalleryOverlay);
galeryOverlayClose.addEventListener('keydown', function(evt){
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay(evt);
  }
});

var onEscClose = document.addEventListener('keydown', function(evt){
  if (evt.keyCode === ESC_KEYCODE){
    if (document.activeElement != formDescription) {
      closeGalleryOverlay(evt);
    }
  }
});

addEventHandler();

// Показ/скрытие формы кадрирования

var formDescription = document.querySelector('.upload-form-description');
var previewImage = document.querySelector('.effect-image-preview');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormClose = document.querySelector('.upload-form-cancel');
var zoomStep = 25;
var maxZoom = 100;
var minZoom = 25;

/**
  * При изменении значения поля загрузки фотографии показывает форму кадрирования (элемент .upload-overlay)
*/
var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
}

var uploadForm = document.querySelector('#upload-file');
uploadForm.addEventListener('change', openUploadOverlay);

/**
  * При клике (нажатии enter) на элементе .upload-form-cancel либо при нажатии клавиши ESC скрывает форму кадрирования (элемент .upload-overlay)
*/
var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
};

uploadFormClose.addEventListener('click', closeUploadOverlay);
uploadFormClose.addEventListener('keydown', function(evt){
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUploadOverlay(evt);
  }
});

var onEscUploadFormClose = document.addEventListener('keydown', function(evt){
  if (evt.keyCode === ESC_KEYCODE){
    if (document.activeElement != formDescription) {
      closeUploadOverlay(evt);
    }
  }
});

/**
  * Удаляет у обьекта .effect-image-preview все классы соответствующие фильтрам
*/
var removeFilterClass = function () {
  previewImage.classList.remove('effect-chrome');
  previewImage.classList.remove('effect-sepia');
  previewImage.classList.remove('effect-marvin');
  previewImage.classList.remove('effect-phobos');
  previewImage.classList.remove('effect-heat');
};

/**
  * Добавляет картинке .effect-image-preview CSS-класс, соответствующий фильтру
  *
  * @param {object} evt обьект .upload-effect-label
*/
var changeFilter = function (evt) {
  removeFilterClass();

  if (evt.currentTarget.classList.contains('upload-effect-label-chrome')) {
      previewImage.classList.add('effect-chrome');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-sepia')) {
    previewImage.classList.add('effect-sepia');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-marvin')) {
    previewImage.classList.add('effect-marvin');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-phobos')) {
    previewImage.classList.add('effect-phobos');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-heat')) {
    previewImage.classList.add('effect-heat');
  }
};

/**
  * Проходится по массиву с фильтрами и добавляет обработчик события по клику
*/
var createPhotosPreviewArray = function () {
  var filtersPreview = document.querySelectorAll('.upload-effect-controls .upload-effect-label');

  for (var i = 0; i < filtersPreview.length; i++) {
    filtersPreview[i].addEventListener('click', changeFilter);
  }
};

createPhotosPreviewArray();

/**
  * Изменяет масштаб изображения .effect-image-preview
  *
  * @param {number} zoomValueNumber значение атрибута value обьекта .upload-resize-controls-value
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
  * При нажатии на кнопку масштабирования увеличивает значение масштаба zoomValueNumber с шагом в 25
*/
var zoom = function () {
  var zoomValue = document.querySelector('.upload-resize-controls-value').value;
  var zoomValueNumber = parseInt(zoomValue, 10);

  if (zoomValueNumber === maxZoom) {
    changeScalePicture(1);
  }  else {
     zoomValueNumber = (zoomValueNumber + zoomStep) / 100;
     changeScalePicture(zoomValueNumber);
  }
};

/**
  * При нажатии на кнопку масштабирования уменьшает значение масштаба zoomValueNumber с шагом в 25
*/
var unzoom = function () {
  var zoomValue = document.querySelector('.upload-resize-controls-value').value;
  var zoomValueNumber = parseInt(zoomValue, 10);

  if (zoomValueNumber === minZoom) {
    changeScalePicture(0.25);
  }  else {
     zoomValueNumber = (zoomValueNumber - zoomStep) / 100;
     changeScalePicture(zoomValueNumber);
  }
};

var pictureScaleIncrease = document.querySelector('.upload-resize-controls-button-inc');
pictureScaleIncrease.addEventListener('click', zoom);

var pictureScaleDecrease = document.querySelector('.upload-resize-controls-button-dec');
pictureScaleDecrease.addEventListener('click', unzoom);
