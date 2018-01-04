'use strict';

(function () {

  /**
    * Генерирует случайное целое число из диапазона заданного параметрами min, max
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
    * Генерирует случайное число из диапазона -0.5 - 0.5
    *
    * @return {object} возвращает случайное число из диапазона -0.5 - 0.5
  */
  var generateRandomNum = function () {
    return Math.random() - 0.5;
  };

  window.data = {
    calcRandomNum: calcRandomNum,
    generateRandomNum: generateRandomNum
  };
})();
