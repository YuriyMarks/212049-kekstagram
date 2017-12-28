'use strict';

(function () {

  /**
    * Отрисовывает сгенерированные DOM-элементы в блок .pictures
    *
    * @param {array} fragment массив фотографий photosDescription
  */
  var createPhotosList = function (fragment) {
    var pictures = document.querySelector('.pictures');

    while (pictures.hasChildNodes()) {
      pictures.removeChild(pictures.lastChild);
    }
    pictures.appendChild(fragment);
    pictures.classList.remove('hidden');
    window.filter.showFilter();

    window.preview.onPictureClick();
  };

  window.picture = {
    createPhotosList: createPhotosList
  };
})();
