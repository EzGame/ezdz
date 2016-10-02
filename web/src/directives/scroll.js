import scrollTemplate from './templates/scroll.html'

// Maybe should be attribute?
var scroll = function() {
  return {
    restrict: "E",
    template: scrollTemplate,
    scope: {
      scrollItems: "=",
      scrollViewPosition: "@"
    },
    link: function(scope, element, attrs) {
      scope.viewItem = scope.scrollItems[0];
      var scrollElement = angular.element(
        element[0].querySelector('div.scrollable')
      );
      //https://material.angularjs.org/latest/demo/virtualRepeat
      var raw = scrollElement[0]

      // TODO add items based on height of scroll bar so that
      // last item can be at height
      scrollElement.bind('scroll', function() {
        debugger
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
