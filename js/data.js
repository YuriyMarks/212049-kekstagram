'use strict';

(function () {


  window.data = {
    /**
    * Вычисляет случайное целое число из диапазона
    *
    * @param {number} min минимальное число из диапазона
    * @param {number} max максимальное число из диапазона
    * @return {number} temp возвращает случайное целое число из диапазона
    */
    calcRandomNum: function (min, max) {
      var temp = Math.floor(Math.random() * (max - min + 1)) + min;

      return temp;
    },

    /**
      * Конкатенирует url фотографии
      *
      * @param {number} i переменная цикла
      * @return {string} photoUrl возвращает url фотографии
    */
    createUrl: function (i) {
      var photoUrl = 'photos/' + parseInt(i + 1, 10) + '.jpg';

      return photoUrl;
    }
  };
})();
