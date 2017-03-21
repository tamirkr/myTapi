/**
 * Created by u53686 on 09/03/2017.
 */
angular.module('app')
  .directive('badgeDirective', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/badgeDirective.html',
      controller: function ($scope, dataService) {

        var query = dataService.get500().query();
        query.$promise.then(function (res) {
          $scope.warning = res.length;
        })
      }


    }

  })
