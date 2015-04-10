/**
 * Created by luiseduardobrito on 3/4/15.
 */
var app = angular.module('sample', [
  'com.devnup.error'
]);

app.controller('SampleCtrl', [
  '$scope', '$error',
  function ($scope, $error) {

    $scope.throwMessage = function (message) {
      $error.throwMessage(message)
    };

    $scope.throwError = function (error) {
      $error.throwError(error)
    };

    $scope.conditionalThrow = function (boolean, error) {
      $error.throw(boolean, error)
    };

  }]);
