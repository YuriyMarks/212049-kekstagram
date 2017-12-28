'use strict';

(function () {

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
    * Случайный результат сравнения
    *
    * @param {object} first обьект
    * @param {object} second обьект
    * @return {object} возвращает случайный результат сравнения
  */
  var compareRandom = function (first, second) {
    return Math.random() - 0.5;
  };

  window.data = {
    calcRandomNum: calcRandomNum,
    compareRandom: compareRandom
  };
})();
