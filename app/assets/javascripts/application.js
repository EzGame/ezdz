// Application.js require tree
//= require jquery
//= require velocity
//= require turbolinks


$(document).on('ready', function() {
  // Free names
  $body = $('body');

  // Scope vars
  var $main = $('#main');
  var $sidebar = $('#sidebar');

  $main.on('click', function() {
    var height = $body.height();
    var width = $body.width();

    if ($main.hasClass('transformed')) {
      $main.removeClass('transformed');
      $main.velocity('reverse');
      $sidebar.velocity('reverse');

    } else {
      $main.addClass('transformed');
      $main.velocity({
        p: { rotateY: '-45deg' },
        o: { duration: 750,
             easing: "swing" }
      });
      $sidebar.velocity(
          'fadeIn',
          { delay: 1000, duration: 1000 }
      )
    }
  });
});



