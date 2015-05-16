// Application.js require tree
//= require jquery
//= require turbolinks
//= require utility

$(document).on('ready', function() {
  // Scope vars
  var $container = $('#app-container');

  $container.on('click', function() {
    if ($container.hasClass('transformed')) {
      $container.removeClass('transformed');
      $container.velocity('reverse');
    } else {
      $container.addClass('transformed');
      $container.velocity({
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
    fullScreen(document.querySelector('body'));
  });
  /* TODO: AJAX Loader show/hide function with callback */
  /* TODO: Hide menu then run AJAX to fetch page */
  /* TODO: AJAX page switch (seems hard) */
});