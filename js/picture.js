'use strict';

(function () {

  window.picture = {
    /**
    * Отрисовывает сгенерированные DOM-элементы в блок .pictures
    *
    * @param {array} fragment массив фотографий photosDescription
   */
    createPhotosList: function (fragment) {
      var pictures = document.querySelector('.pictures');

      pictures.appendChild(fragment);
      pictures.classList.remove('hidden');
      window.preview.addEventHandler(pictures);
    }
  };
})();
