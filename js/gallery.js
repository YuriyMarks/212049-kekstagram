'use strict';

// Отрисовка галереи картинок.

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;

  /**
    * Клонирует обьект из template подставляет значения url и описание
    * картинки и сохраняет во fragment
    *
    * @param {array} arr массив фотографий photosDescription
  */
  window.gallery = {
    createPhotoElement: function (arr) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arr.length; i++) {
        var pictureTemplateElement = pictureTemplate.cloneNode(true);

        pictureTemplateElement.querySelector('.picture img').src = arr[i].url;
        pictureTemplateElement.querySelector('.picture-likes').textContent = arr[i].likes;
        pictureTemplateElement.querySelector('.picture-comments').textContent = arr[i].comments;

        fragment.appendChild(pictureTemplateElement);
      }
      window.picture.createPhotosList(fragment);
    }
  };

  window.data.createArrayOfPhotosDescription();
})();
