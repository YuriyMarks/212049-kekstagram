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

  var temp = evt.target.parentNode;

  document.querySelector('.gallery-overlay-image').src = temp.querySelector('img').src;
  document.querySelector('.likes-count').textContent = temp.querySelector('.picture-likes').textContent;
  document.querySelector('.comments-count').textContent = temp.querySelector('.picture-comments').textContent;
  document.querySelector('.gallery-overlay').classList.remove('hidden')
};

/**
  * При нажатии на элемент .gallery-overlay-close либо при нажатии клавиши ESC скрывает элемент .gallery-overlay
*/
var closePicture = function() {
  document.querySelector('.gallery-overlay').classList.add('hidden');
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

document.querySelector('.gallery-overlay-close').addEventListener('keydown', function(evt){
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
