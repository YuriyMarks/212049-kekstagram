'use strict';

(function () {

  window.filter = {

    showFilter: function () {
      var filters = document.querySelector('.filters');

      filters.classList.remove('filters-inactive');
    },

    filterClickHandler: function (evt, pictures, callback) {

      if (evt.currentTarget.value === 'popular') {
        var picturesCopy = [].slice.call(pictures).sort(function (first, second) {
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
        var picturesCopy = [].slice.call(pictures).sort(function (first, second) {
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
        var picturesCopy = [].slice.call(pictures).sort();
      }

      if (evt.currentTarget.value === 'recommend'){
        var picturesCopy = [].slice.call(pictures);
      }

      if (typeof callback === 'function') {
        callback(picturesCopy);
      }
    }
  };
})();
