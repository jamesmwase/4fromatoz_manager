window.addEventListener('load', function () {
  window.addEventListener('click', function (event) {
    var conditions = event.target.matches('#bar-icon-wrapper') || event.target.matches('.fa-bars');
    if (conditions) {
      var wrapper = document.querySelector('#navbar-content-wrapper');
      wrapper.style.display = 'block';
    }
  })
})
