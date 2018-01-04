'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var uploadFile = document.querySelector('#upload-file');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectPreview = document.querySelectorAll('.upload-effect-preview');

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        effectImagePreview.classList.remove(window.temp);
        effectImagePreview.style = '';
        effectImagePreview.src = reader.result;
        for (var i = 0; i < uploadEffectPreview.length; i++) {
          uploadEffectPreview[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
      });
      reader.readAsDataURL(file);
    }
  });
})();
