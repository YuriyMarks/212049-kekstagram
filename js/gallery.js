'use strict';

// Отрисовка галереи картинок.

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureTemplateList = document.querySelector('.pictures');

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
      createPhotosList(fragment);
    }
  };

  /**
    * Отрисовывает сгенерированные DOM-элементы в блок .pictures
    *
    * @param {array} fragment массив фотографий photosDescription
  */
  var createPhotosList = function (fragment) {
    var pictures = document.querySelector('.pictures');

    pictureTemplateList.appendChild(fragment);
    pictures.classList.remove('hidden');
  };

  window.data.createArrayOfPhotosDescription();
})();
