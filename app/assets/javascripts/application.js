// Application.js require tree
//= require jquery
//= require velocity
//= require turbolinks
//= require utility

$(document).on('ready', function() {
  // Free names
  $body = $('body');

  // Scope vars
  var $main = $('#app-main');

  $main.on('click', function() {
    if ($main.hasClass('transformed')) {
      $main.removeClass('transformed');
      $main.velocity('reverse');
    } else {
      $main.addClass('transformed');
      $main.velocity({
        p: { rotateY: '-45deg' }
      });
    }
  });

  // Run intro
  $('#app-intro img').velocity(
      'fadeOut',
      { duration: 500,
        delay: 1500 }
  );
  $('#app-intro').velocity(
      'fadeOut',
      { duration: 1500,
        delay: 1500 }
  );

  $('#fullscreen').on('click', function() {
    fullScreen(document.querySelector('#app-bg'));
  });
  /* TODO: AJAX Loader show/hide function with callback */
  /* TODO: Hide menu then run AJAX to fetch page */
  /* TODO: AJAX page switch (seems hard) */
});