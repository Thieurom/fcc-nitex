(function () {
  var form = document.querySelector('.form');

  form.addEventListener('submit', function (e) {
    if (!form.location.value) {
      e.preventDefault();
    }
  });
})();