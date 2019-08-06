$(window).ready( function (e) {
  $(window).click( function (e) {
    if (e.target.matches('#submit-tag')) {
      $('#submit-tag').addClass('is-loading')
      $.ajax({
          url: $('form').attr('action'),
          type: 'post',
          dataType: 'json',
          data: $('form').serialize(),
          success: async function (data) {
           setTimeout( function () {
              $('#submit-tag').removeClass('is-loading is-link').addClass('is-success is-outlined').text(data).attr('disabled', true).removeAttr('id')
            }, 3000)
         }
      });
    }
  })
})
