'use strict';

(function () {
  var pictureTemplateList = document.querySelector('.pictures');

  /**
    * Отрисовывает сгенерированные DOM-элементы в блок .pictures
    *
    * @param {array} fragment массив фотографий photosDescription
  */
  window.picture = {
    createPhotosList: function (fragment) {
      var pictures = document.querySelector('.pictures');

      pictureTemplateList.appendChild(fragment);
      pictures.classList.remove('hidden');
    }
  };
})();
