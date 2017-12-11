'use strict';

// Отрисовка галереи картинок.

(function () {
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
    * Добавляет в массив сгенерированные JS объекты, которые
    * будут описывать фотографии, размещенные другими пользователями
  */
  var createArrayOfPhotosDescription = function () {
    var photosDescription = [];

    for (var i = 0; i < photosArraySize; i++) {
      var photoDescript = {
        url: window.data.createUrl(i),
        likes: window.data.calcRandomNum(15, 200),
        comments: comments[window.data.calcRandomNum(0, comments.length - 1)],
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
    var pictures = document.querySelector('.pictures');

    pictureTemplateList.appendChild(fragment);
    pictures.classList.remove('hidden');
  };

  createArrayOfPhotosDescription();
})();
