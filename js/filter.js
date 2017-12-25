'use strict';

(function () {

  window.filter = {
   filterClickHandler: function (evt, pictures, callback) {

     var picturesCopy = [].slice.call(pictures).sort(function (first, second) {
       if (first.likes > second.likes) {
         return -1;
       } else if (first.likes < second.likes) {
         return 1;
       } else {
         return 0;
       }
     });
     if (typeof callback === 'function') {
       callback(picturesCopy);
     }
    }
  };
})();
