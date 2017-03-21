/**
 * Created by u53686 on 05/03/2017.
 */
'use strict';

ModalSavedSearchCtrl.$inject = ['$uibModalInstance', 'search', 'savedSearchService'];

function ModalSavedSearchCtrl($uibModalInstance, search, savedSearchService) {
  var ctrl = this;

  ctrl.searches = search;

  ctrl.ok = function () {
    $uibModalInstance.close();
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  ctrl.cleanSearches = function () {
    savedSearchService.remove();
    $uibModalInstance.dismiss('cancel');
  };
}

angular.module('app')
  .controller('ModalSavedSearchCtrl', ModalSavedSearchCtrl);
