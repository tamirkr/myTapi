/**
 * Created by u53686 on 28/02/2017.
 */
'use strict';

UserDetailsCtrl.$inject = ['dataService', '$stateParams', '$state'];

function UserDetailsCtrl(dataService, $stateParams, $state) {
    var ctrl = this;
    var query = dataService.get500().query();

    query.$promise.then(function (data) {
      data.filter(function (item) {
        if(item.id === parseInt($stateParams.id)) {
          ctrl.user = item;
        }
      })
    })

  ctrl.back = function () {
    $state.go('warnings')
  }



}
angular.module('app')
    .controller('UserDetailsCtrl', UserDetailsCtrl);
