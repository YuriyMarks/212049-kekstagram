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
    var galleryOverlayControlsComments = document.querySelector('.gallery-overlay-controls-comments');

    for (var i = 0; i < pictures.length; i++) {
      var pictureTemplateElement = pictureTemplate.cloneNode(true);
console.log(pictures);
      pictureTemplateElement.querySelector('.picture img').src = pictures[i].url;
      pictureTemplateElement.querySelector('.picture-likes').textContent = pictures[i].likes;
      pictureTemplateElement.querySelector('.picture-comments').textContent = pictures[i].comments[window.data.calcRandomNum(0, pictures[i].comments.length - 1)];
      galleryOverlayControlsComments.textContent = pictures[i].comments.length;

      fragment.appendChild(pictureTemplateElement);
    }
    window.picture.createPhotosList(fragment);
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 10; margin: 0 auto; padding-top: 25px; text-align: center; background-color: rgba(255, 0, 0, 0.9); border: 2px solid firebrick;';
    node.style.position = 'absolute';
    node.style.left = 'calc(50% - 225px)';
    node.style.top = '100px';
    node.style.width = '450px';
    node.style.height = '50px';
    node.style.fontSize = '20px';
    node.style.color = 'black';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(createGalery, errorHandler);
})();
