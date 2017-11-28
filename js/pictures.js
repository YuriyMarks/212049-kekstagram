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
var pictureTemplateFirstElement = document.querySelector('.gallery-overlay');
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
      comments: COMMENTS[calcRandomNum(0, 5)],
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
var createPhotosList = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosDescription.length; i++) {
    var pictureTemplateElement = pictureTemplate.cloneNode(true);

    pictureTemplateElement.querySelector('.picture img').src = arr[i].url;
    pictureTemplateElement.querySelector('.picture-likes').textContent = arr[i].likes;
    pictureTemplateElement.querySelector('.picture-comments').textContent = arr[i].comments;

    fragment.appendChild(pictureTemplateElement);
  }
  pictureTemplateList.appendChild(fragment);

  pictureTemplateFirstElement.querySelector('.gallery-overlay-image').src = arr[0].url;
  pictureTemplateFirstElement.querySelector('.likes-count').textContent = arr[0].likes;
  pictureTemplateFirstElement.querySelector('.comments-count').textContent = arr[0].comments;

  fragment.appendChild(pictureTemplateElement);
  pictureTemplateFirstElement.appendChild(fragment);
};

document.querySelector('.pictures').classList.remove('hidden');
document.querySelector('.gallery-overlay').classList.remove('hidden');

createArrayOfPhotosDescription();
