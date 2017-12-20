'use strict';

// Отрисовка галереи картинок.

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;

  /**
    * Клонирует обьект из template подставляет значения url и описание
    * картинки и сохраняет во fragment
    *
    * @param {array} pictures массив фотографий
  */
  var createGalery = function (pictures) {
    var fragment = document.createDocumentFragment();

      for (var i = 0; i < pictures.length; i++) {
        var pictureTemplateElement = pictureTemplate.cloneNode(true);

        pictureTemplateElement.querySelector('.picture img').src = pictures[i].url;
        pictureTemplateElement.querySelector('.picture-likes').textContent = pictures[i].likes;
        pictureTemplateElement.querySelector('.picture-comments').textContent = pictures[i].comments[window.data.calcRandomNum(0, pictures[i].comments.length - 1)];

        fragment.appendChild(pictureTemplateElement);
      }
      window.picture.createPhotosList(fragment);
  };

  var errorHandler = function (message) {
    alert(message);
  };

  window.load(createGalery, errorHandler);
})();
