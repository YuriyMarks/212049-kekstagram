'use strict';

(function () {
  var comments = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
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

  window.data = {
    /**
      * Добавляет в массив сгенерированные JS объекты, которые
      * будут описывать фотографии, размещенные другими пользователями
    */
    createArrayOfPhotosDescription: function () {
      var photosDescription = [];

      for (var i = 0; i < photosArraySize; i++) {
        var photoDescript = {
          url: createUrl(i),
          likes: calcRandomNum(15, 200),
          comments: comments[calcRandomNum(0, comments.length - 1)],
        };
        photosDescription[i] = photoDescript;
      }
      window.gallery.createPhotoElement(photosDescription);
    }
  };
})();
