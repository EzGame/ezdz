import scrollTemplate from './templates/scroll.html'

// Maybe should be attribute?
var scroll = function() {
  return {
    restrict: "E",
    template: scrollTemplate,
    scope: {
      scrollItems: "="
    },
    link: function(scope, element, attrs) {
      scope.viewItem = scope.scrollItems[0];
      var scrollElement = angular.element(
        element[0].querySelector('div.scrollable')
      );
      var raw = scrollElement[0]

      scrollElement.bind('scroll', function() {
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
          console.log("Bottom");
        }
      });
    }
  }
}

export default
  angular.module('directives', [])
    .directive('scroll', scroll)
    .name
