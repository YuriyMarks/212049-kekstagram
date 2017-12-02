'use strict';

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photosDescription = [];
var pictureTemplate = document.querySelector('#picture-template').content;
var pictureTemplateList = document.querySelector('.pictures');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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
  * Добавляет в массив 25 сгенерированных JS объектов, которые будут описывать фотографии, размещенные другими пользователями
  *
  * @param {string} url строка — адрес картинки
  * @param {number} likes число — количество лайков, поставленных фотографии. Случайное число от 15 до 200
  * @param {string} comments массив строк — список комментариев, оставленных другими пользователями к этой фотографии
  * @param {object} photoDescript сгенерированный обьект описывающий фотографию
*/
var createArrayOfPhotosDescription = function () {
  for (var i = 0; i < 25; i++) {
    var photoDescript = {
      url: 'photos/' + parseInt(i + 1, 10) + '.jpg',
      likes: calcRandomNum(15, 200),
      comments: COMMENTS[calcRandomNum(0, COMMENTS.length - 1)],
    };
    photosDescription[i] = photoDescript;
  }
  createPhotosList(photosDescription);
};

/**
  * Клонирует обьекты из template и отрисовывает сгенерированные DOM-элементы в блок .pictures, для вставки элементов использует DocumentFragment
  *
  * @param {array} arr массив состоящий из 25 сгенерированных JS объектов, которые будут описывать фотографии
  * @param {object} pictureTemplateElement клонированный обьект со сгенерированными параметрами url - адрес картинки, likes - количество лайков, comments - список комментариев
*/
var fragment = document.createDocumentFragment();

var createPhotosList = function (arr) {

  for (var i = 0; i < photosDescription.length; i++) {
    var pictureTemplateElement = pictureTemplate.cloneNode(true);

    pictureTemplateElement.querySelector('.picture img').src = arr[i].url;
    pictureTemplateElement.querySelector('.picture-likes').textContent = arr[i].likes;
    pictureTemplateElement.querySelector('.picture-comments').textContent = arr[i].comments;

    fragment.appendChild(pictureTemplateElement);
  }
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
  document.querySelector('.gallery-overlay-image').src = this.querySelector('img').src;
  document.querySelector('.likes-count').textContent = this.querySelector('.picture-likes').textContent;
  document.querySelector('.comments-count').textContent = this.querySelector('.picture-comments').textContent;
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
  *
  * @param {array} pictures массив содержащий все фотографии - обьекты .picture
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
