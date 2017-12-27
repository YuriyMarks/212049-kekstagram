'use strict';

(function () {

  window.filter = {

    showFilter: function () {
      var filters = document.querySelector('.filters');

      filters.classList.remove('filters-inactive');
    },

    filterClickHandler: function (evt, pictures, callback) {
      var picturesCopy = [];

      if (evt.currentTarget.value === 'popular') {
        picturesCopy = [].slice.call(pictures).sort(function (first, second) {
          if (first.likes > second.likes) {
            return -1;
          } else if (first.likes < second.likes) {
              return 1;
          } else {
              return 0;
          }
        });
      }

      if (evt.currentTarget.value === 'discussed') {
        picturesCopy = [].slice.call(pictures).sort(function (first, second) {
          if (first.comments.length > second.comments.length) {
            return -1;
          } else if (first.comments.length < second.comments.length) {
              return 1;
          } else {
              return 0;
          }
        });
      }

      if (evt.currentTarget.value === 'random') {
        picturesCopy = [].slice.call(pictures).sort();
      }

      if (evt.currentTarget.value === 'recommend'){
        picturesCopy = [].slice.call(pictures);
      }

      if (typeof callback === 'function') {
        console.log(picturesCopy);
        callback(picturesCopy);
      }
    }
  };
})();
