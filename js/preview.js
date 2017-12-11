'use strict';

// Показ/скрытие картинки в галерее.

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
  var addEventHandler = function () {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', pictureClickHandler);
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
    if (evt.keyCode === ENTER_KEYCODE) {
      closeGalleryOverlay();
    }
  };

  /**
    * При нажатии клавиши esc скрывает картинку .gallery-overlay
    *
    * @param {object} evt обьект .gallery-overlay-close
  */
  var onGalleryOverlayEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.activeElement !== formDescription) {
        closeGalleryOverlay();
      }
    }
  };

  addEventHandler();
})();
