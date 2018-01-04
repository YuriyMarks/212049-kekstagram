'use strict';

(function () {
  var galeryOverlay = document.querySelector('.gallery-overlay');
  var galeryOverlayClose = document.querySelector('.gallery-overlay-close');

  /**
    * При нажатии на любой из элементов .picture отрисовывает элемент
    * .gallery-overlay с подробным описанием картинки
    *
    * @param {object} evt обьект .picture
  */
  var drawGaleryOverlay = function (evt) {
    evt.preventDefault();

    var temp = evt.currentTarget;

    var galeryOverlayImage = document.querySelector('.gallery-overlay-image');
    var likesCount = document.querySelector('.likes-count');
    var commentsCount = document.querySelector('.comments-count');

    galeryOverlayImage.src = temp.querySelector('img').src;
    likesCount.textContent = temp.querySelector('.picture-likes').textContent;
    commentsCount.textContent = temp.querySelector('.picture-comments').textContent;
    galeryOverlay.classList.remove('hidden');
  };

  /**
    * Добавляет обработчик события 'click' на все элементы .picture
  */
  var addOnPictureClickHandler = function () {
    var picturesArray = document.querySelectorAll('.picture');

    for (var i = 0; i < picturesArray.length; i++) {
      picturesArray[i].addEventListener('click', drawGaleryOverlay);
    }
    galeryOverlayClose.addEventListener('click', closeGalleryOverlay);
    galeryOverlayClose.addEventListener('keydown', pressEnterOnGalleryOverlay);
    document.addEventListener('keydown', pressEscOnGalleryOverlay);
  };

  /**
    * При клике на элемент .gallery-overlay-close скрывает элемент .gallery-overlay
  */
  var closeGalleryOverlay = function () {
    galeryOverlay.classList.add('hidden');
  };

  /**
    * При фокусировке на обьекте .gallery-overlay-close и нажатии клавиши
    * enter скрывает картинку .gallery-overlay
    *
    * @param {object} evt обьект .gallery-overlay-close
  */
  var pressEnterOnGalleryOverlay = function (evt) {
    window.util.pressEnter(evt, closeGalleryOverlay);
  };

  /**
    * При нажатии клавиши esc скрывает картинку .gallery-overlay
    *
    * @param {object} evt обьект .gallery-overlay-close
  */
  var pressEscOnGalleryOverlay = function (evt) {
    window.util.pressEsc(evt, closeGalleryOverlay);
  };

  window.preview = {
    addOnPictureClickHandler: addOnPictureClickHandler
  };
})();
