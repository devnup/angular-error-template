/**
 * Created by luiseduardobrito on 3/4/15.
 */
angular.module('sample', [
  'com.devnup.error'
])
  .run(['$error', function ($error) {

    $error
      .codes(true)
      .json('assets/json/codes.json');
  }])

  .controller('SampleCtrl', [
    '$scope', '$error',
    function ($scope, $error) {

      $scope.send = function (input) {
        $error.throw(!input, 'MISSING_PARAMS');
        console.info(input);
      };

    }]);
