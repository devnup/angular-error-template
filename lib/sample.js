/**
 * Created by luiseduardobrito on 3/4/15.
 */
var app = angular.module('sample', [
    'com.devnup.snippets.sample'
]);

app.controller('SampleCtrl', [
    '$scope', '$sample',
    function ($scope, $sample) {

      $scope.hello = function(name) {
        return $sample.hello(name);
      };

      $scope.greet = function(name) {
        return $sample.greet(name);
      };

    }]);