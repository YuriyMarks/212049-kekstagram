'use strict';

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
  pictureTemplateList.appendChild(fragment);

  document.querySelector('.pictures').classList.remove('hidden');
};

createArrayOfPhotosDescription();

/**
  * При нажатии на любой из элементов .picture отрисовывает элемент .gallery-overlay с подробным описанием картинки
  *
  * @param {object} evt обьект .picture
*/
var pictureClickHandler = function (evt) {
  evt.preventDefault();

  var temp = evt.currentTarget;

  document.querySelector('.gallery-overlay-image').src = temp.querySelector('img').src;
  document.querySelector('.likes-count').textContent = temp.querySelector('.picture-likes').textContent;
  document.querySelector('.comments-count').textContent = temp.querySelector('.picture-comments').textContent;
  document.querySelector('.gallery-overlay').classList.remove('hidden')
};

/**
  * При нажатии на элементы .gallery-overlay-close, .upload-overlay либо при нажатии клавиши ESC скрывает элемент .gallery-overlay
*/
var closePicture = function () {
  document.querySelector('.gallery-overlay').classList.add('hidden');
  document.querySelector('.upload-overlay').classList.add('hidden');
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

document.querySelector('.gallery-overlay-close').addEventListener('click', closePicture);

document.querySelector('.upload-form-cancel').addEventListener('click', closePicture);

document.querySelector('.gallery-overlay-close').addEventListener('keydown', function(evt){
  if (evt.keyCode === ENTER_KEYCODE) {
    closePicture(evt);
  }
});

document.querySelector('.upload-form-cancel').addEventListener('keydown', function(evt){
  if (evt.keyCode === ENTER_KEYCODE) {
    closePicture(evt);
  }
});

document.addEventListener('keydown', function(evt){
  if (evt.keyCode === ESC_KEYCODE){
    closePicture(evt);
  }
});

addEventHandler();

document.querySelector('#upload-file').addEventListener('change', function(){
  document.querySelector('.upload-overlay').classList.remove('hidden');
});

/**
  * Удаляет у обьекта .effect-image-preview все классы соответствующие фильтрам
*/
var removeClass = function () {
  var rmvClass = document.querySelector('.effect-image-preview');

  rmvClass.classList.remove('effect-chrome');
  rmvClass.classList.remove('effect-sepia');
  rmvClass.classList.remove('effect-marvin');
  rmvClass.classList.remove('effect-phobos');
  rmvClass.classList.remove('effect-heat');
};

/**
  * Добавляет картинке .effect-image-preview CSS-класс, соответствующий фильтру
  *
  * @param {object} evt обьект .upload-effect-label
*/
var changeFilter = function (evt) {
  var addClass = document.querySelector('.effect-image-preview');

  removeClass();

  if (evt.currentTarget.classList.contains('upload-effect-label-chrome')) {
      addClass.classList.add('effect-chrome');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-sepia')) {
    addClass.classList.add('effect-sepia');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-marvin')) {
    addClass.classList.add('effect-marvin');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-phobos')) {
    addClass.classList.add('effect-phobos');
  } else if (evt.currentTarget.classList.contains('upload-effect-label-heat')) {
    addClass.classList.add('effect-heat');
  }
};

/**
  * Проходится по массиву с фильтрами и добавляет обработчик события по клику
*/
var createPhotosPreviewArray = function () {
  var previwPhotos = document.querySelectorAll('.upload-effect-controls .upload-effect-label');

  for (var i = 0; i < previwPhotos.length; i++) {
    previwPhotos[i].addEventListener('click', changeFilter);
  }
};

createPhotosPreviewArray();

/**
  * Изменяет масштаб изображения .effect-image-preview
  *
  * @param {number} zoomValueNumber значение атрибута value обьекта .upload-resize-controls-value
*/
var scalePicture = function (zoomValueNumber) {
  var styleTransform = document.querySelector('.effect-image-preview').style.transform = 'scale('+zoomValueNumber+')';

  changeZoomValue(zoomValueNumber * 100 + '%');
};

/**
  * Изменяет значение атрибута value обьекта .upload-resize-controls-value
  *
  * @param {number} value значение атрибута value в процентах
*/
var changeZoomValue = function (value) {
  document.querySelector('.upload-resize-controls-value').value = value;
};

/**
  * При нажатии на кнопку масштабирования увеличивает значение масштаба zoomValueNumber с шагом в 25
*/
var zoom = function () {
  var zoomValue = document.querySelector('.upload-resize-controls-value').value;
  var zoomValueNumber = parseInt(zoomValue, 10);
  var zoomStep = 25;
  var maxZoom = 100;

  if (zoomValueNumber === maxZoom) {
    scalePicture(1);
  }  else {
     zoomValueNumber = (zoomValueNumber + zoomStep) / 100;
     scalePicture(zoomValueNumber);
  }
};

/**
  * При нажатии на кнопку масштабирования уменьшает значение масштаба zoomValueNumber с шагом в 25
*/
var unzoom = function () {
  var zoomValue = document.querySelector('.upload-resize-controls-value').value;
  var zoomValueNumber = parseInt(zoomValue, 10);
  var zoomStep = 25;
  var minZoom = 25;

  if (zoomValueNumber === minZoom) {
    scalePicture(0.25);
  }  else {
     zoomValueNumber = (zoomValueNumber - zoomStep) / 100;
     scalePicture(zoomValueNumber);
  }
};

document.querySelector('.upload-resize-controls-button-inc').addEventListener('click', zoom);

document.querySelector('.upload-resize-controls-button-dec').addEventListener('click', unzoom);


