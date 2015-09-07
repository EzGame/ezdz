// // Application.js require tree
// //= require jquery
// //= require velocity

// $(document).on('ready', function() {
//   var $frame = $('#app-frame');
//   var $topbar = $('#app-topbar');
//   var $container = $('#app-container');
//   var $menu = $('#app-topbar i.fa-bars');
//   var $expand = $('#app-topbar i.fa-expand');

//   // Scroll block
//   function frameScrollHandler() {
//     console.log("hi");
//     var position = $(this).scrollTop();
//     if (position > 10) {
//       $topbar.css('background','rgba(0,0,0,0)')
//     } else {
//       $topbar.css('background','rgba(0,0,0,1)')
//     }
//   };

//   // Menu block
//   $menu.on('click', function() {
//     if ($container.hasClass('transformed')) {
//       $container.removeClass('transformed');
//       $container.velocity('reverse');
//     } else {
//       $container.addClass('transformed');
//       $container.velocity({
//         p: { rotateY: '-30deg' }
//       });
//     }
//   });

//   $('#app-menu li').on('click', function() {
//     function switchPage() {
//     };

//     $('#app-body')
//         .velocity({ translateZ: '-9000px' },
//                   { duration: 1000,
//                     complete: function(){ switchPage() } })
//         .velocity({ translateZ: '0px',
//                     translateY: '-1000px'},
//                   { duration: 0 })
//         .velocity({ translateY: '0px'},
//                   { duration: 1000 });
//   });


//   // Expand block

//   $expand.on('click', function() {
//     fullScreen(document.querySelector('body'));
//   });

//   // Intro block
//   $('#app-intro img').velocity(
//       'fadeOut',
//       { duration: 500,
//         delay: 1500 }
//   );
//   $('#app-intro').velocity(
//       'fadeOut',
//       { duration: 1500,
//         delay: 1500 }
//   );
// });

// function fullScreen(element) {
//   var requestMethod = element.requestFullScreen ||
//       element.webkitRequestFullScreen ||
//       element.mozRequestFullScreen ||
//       element.msRequestFullscreen;

//   if (requestMethod) {
//     requestMethod.call(element);
//   } else if (typeof window.ActiveXObject !== "undefined") {
//     var wscript = new ActiveXObject("WScript.Shell");
//     if (wscript !== null) {
//       wscript.SendKeys("{F11}");
//     }
//   }
// }
