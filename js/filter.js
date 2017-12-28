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

    if (evt.currentTarget.value === 'recommend'){

    }

    if (typeof callback === 'function') {
      callback(picturesCopy);
    }
  };

  window.filter = {
    showFilter: showFilter,
    filterClickHandler: filterClickHandler
  };
})();
