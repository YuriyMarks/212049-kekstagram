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
  var pictureClickHandler = function (evt) {
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
  var onPictureClick = function () {
    var picturesArray = document.querySelectorAll('.picture');

    for (var i = 0; i < picturesArray.length; i++) {
      picturesArray[i].addEventListener('click', pictureClickHandler);
    }
    galeryOverlayClose.addEventListener('click', closeGalleryOverlay);
    galeryOverlayClose.addEventListener('keydown', onGalleryOverlayEnterPress);
    document.addEventListener('keydown', onGalleryOverlayEscPress);
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
  var onGalleryOverlayEnterPress = function (evt) {
    window.util.onEnterPress(evt, closeGalleryOverlay);
  };

  /**
    * При нажатии клавиши esc скрывает картинку .gallery-overlay
    *
    * @param {object} evt обьект .gallery-overlay-close
  */
  var onGalleryOverlayEscPress = function (evt) {
    window.util.onEscPress(evt, closeGalleryOverlay);
  };

  window.preview = {
    onPictureClick: onPictureClick
  };
})();
