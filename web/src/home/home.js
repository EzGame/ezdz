import './home.scss';
import scroll from '../directives/scroll';


export default
  angular.module('app.home', [scroll])
    .controller('HomeController',
      ['$scope', function($scope) {
        $scope.text = "dank memes"

        // temp create items
        $scope.list_of_things = []
        for (var i = 0; i < 100; i++) {
          $scope.list_of_things.push("A thing " + i);
        }
      }])
    .name;