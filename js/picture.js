'use strict';

(function () {

  window.picture = {
    /**
    * Отрисовывает сгенерированные DOM-элементы в блок .pictures
    *
    * @param {array} fragment массив фотографий photosDescription
   */
    createPhotosList: function (fragment) {
      console.log(fragment);
      var pictures = document.querySelector('.pictures');
      var filters = document.querySelector('.filters');

      pictures.appendChild(fragment);
      pictures.classList.remove('hidden');
      filters.classList.remove('filters-inactive');

      window.preview.onPictureClick();
    }
  };
})();
