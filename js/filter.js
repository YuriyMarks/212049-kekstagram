'use strict';

(function () {

  /**
    * Показывает блок .filters
  */
  var showFilter = function () {
    var filters = document.querySelector('.filters');

    filters.classList.remove('filters-inactive');
  };

  /**
    * Выполняет функцию указанную в первом аргументе, асинхронно,
    * с задержкой
    *
    * @param {function} f функция
    * @param {number} ms время задержки в миллисекундах
    *
  */
  var debounce = function (f, ms) {
    setTimeout(f, ms);
  };

  /**
    * При нажатии на любой из элементов filters-radio сортирует картинки
    *
    * @param {evt} evt обьект .filters-radio
    * @param {array} pictures массив картинок
    * @param {function} callback функция обратного вызова
  */
  var filterClickHandler = function (evt, pictures, callback) {
    var picturesCopy = [];

    if (evt.currentTarget.value === 'popular') {
      picturesCopy = [].slice.call(pictures).sort(function (first, second) {
        return second.likes - first.likes;
      });
    }

    if (evt.currentTarget.value === 'discussed') {
      picturesCopy = [].slice.call(pictures).sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    }

    if (evt.currentTarget.value === 'random') {
      picturesCopy = [].slice.call(pictures).sort(window.data.compareRandom);
    }

    if (evt.currentTarget.value === 'recommend') {
      picturesCopy = window.picturesFromServer;
    }

    if (typeof callback === 'function') {
      debounce(function () {
        callback(picturesCopy);
      }, 500);
    }
  };

  window.filter = {
    showFilter: showFilter,
    filterClickHandler: filterClickHandler
  };
})();
