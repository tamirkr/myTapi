/**
 * Created by u53686 on 01/03/2017.
 */
'use strict';

NyaCtrl.$inject = ['dataService', 'dropdownService', 'SweetAlert', '$uibModal', 'savedSearchService', '$timeout', 'lastSearchService'];

function NyaCtrl(dataService, dropdownService, SweetAlert, $uibModal, savedSearchService, $timeout, lastSearchService) {
    var ctrl = this;
    var data = [];
    ctrl.model = {
      name: [],
      street: [],
      date: new Date()
    };
    ctrl.commonDatepicker = new Date();
    ctrl.searched = false;
    ctrl.loading = true;
    ctrl.options2 = [
        317, 155, 124, 824, 853, 374, 639, 510, 834, 969
    ];

    var query = dataService.get500().query();
    query.$promise.then(function (data) {
      for ( var i = 0; i < data.length; i++ ){
        var registeredDate = new Date( data[i].registered );

        data[i].registered = new Date( registeredDate.getFullYear(), registeredDate.getMonth(), 1 )
      }

      if(lastSearchService.get().length !== 0) {
        ctrl.gridOptions.data = lastSearchService.get();
        // lastSearchService.remove();
      } else {
        ctrl.gridOptions.data = data;
      }


    });

    /* Grid data options*/
    ctrl.gridOptions = {
        enableFiltering: false,
        enableSorting: false,
        showGridFooter: true,
        appScopeProvider: ctrl,
        data: data,
        columnDefs: [
            {name: 'שם', field: 'name', cellTooltip: true, headerTooltip: true, cellTemplate: '<a type="button"  href="" ng-click="grid.appScope.open(row.entity.id)"> {{ row.entity.name}} </a>'},
            {name: 'רחוב', field: 'address.street', cellTooltip: true, headerTooltip: true, cellTemplate: '<a ui-sref="details({id:row.entity.id})">{{row.entity.address.street}}</a>'},
            {name: 'גיל', field: 'age'},
            {name: 'מאזן', field: 'balance'},
            {name: 'חברה', field: 'company'},
            {name: 'מייל', field: 'email'},
            {name: 'נרשם', field: 'registered', cellFilter: 'date', type: 'date'},
            {name: 'הערות', field: 'about', width: '80', cellTemplate:'<span class="{{grid.appScope.getCommentIcon(row.entity.about)}}-icon" ng-click="grid.appScope.openCommentModal(row.entity.id)"></span>'}
        ]
    };

    ctrl.getCommentIcon = function (comment) {
        return comment.length > 0  || comment.trim().length > 0 ? 'edit' : 'new';
    }

    ctrl.openCommentModal = function (id) {
      $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/myModalComment.html',
        controller: 'ModalCommentCtrl',
        controllerAs: 'vm',
        size: 'lg',
        animation: true,
        resolve: {
          comment: function () {
            for(var i of ctrl.gridOptions.data) {
                if (i.id === id)
                  return i
            }
          }
        }


      });
    }


    ctrl.filter = function () {
      var res = [];
      if(angular.isUndefined(ctrl.model) || Object.keys(ctrl.model).length === 0) {
        SweetAlert.swal("שגיאה", "אנא בחר רשומה", "error");
        return;
      }

      ctrl.gridOptions.data.filter(function (item) {
        Object.keys(ctrl.model).map(function (key, index) {
            if(ctrl.model[key] instanceof Array) {
              for(var i of ctrl.model[key]) {
                if(item.name === i || item.address.street === i)
                  res.push(item);
              }
            } else if(ctrl.model[key] instanceof Date && ctrl.model[key].toDateString() === item.registered.toDateString()) {
                res.push(item);
            }

        })
      })
      savedSearchService.set({search: ctrl.model});
      lastSearchService.set(res);
      ctrl.gridOptions.data = res;
      ctrl.searched = !ctrl.searched;
      ctrl.model = {};

    }


    /* clean the search dropdown*/
    ctrl.deleteSearch = function () {
        ctrl.model = {};
        var query = dataService.get500().query();
        query.$promise.then(function (data) {
          for ( var i = 0; i < data.length; i++ ){
            var registeredDate = new Date( data[i].registered );

            data[i].registered = new Date( registeredDate.getFullYear(), registeredDate.getMonth(), 1 )
          }
          ctrl.gridOptions.data = data;
        });
        ctrl.searched = false;
        lastSearchService.remove();
    };

    /* get data for the dropdown options*/
    ctrl.fetch = function () {
        $timeout(function () {
            dropdownService.getDropdownData()
                .then(function (data) {
                    ctrl.loading = true;
                    ctrl.options = [];
                    angular.forEach(data, function (item) {
                        ctrl.options.push(item.name);
                    })
                }).finally(function () {
                ctrl.loading = false;
            })
        }, 1000)

    }


    /* open the ui-bootstrap editing modal*/
    ctrl.open = function (id) {

        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'vm',
            size: 'lg',
            animation: true,
            resolve: {
                item: function () {
                    for(var i of ctrl.gridOptions.data) {
                      if(i.id === id)
                        return i;
                    }
                }
            }
        });

    }

    /* open the ui-bootstrap saved search modal*/
    ctrl.savedSearch = function () {
      $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/mySavedSearchesModal.html',
        controller: 'ModalSavedSearchCtrl',
        controllerAs: 'vm',
        size: 'lg',
        animation: true,
        resolve: {
          search: function () {

            return savedSearchService.get();
          }
        }


      });
    }


    /* get the date picker value*/
    ctrl.change = function () {
      for(var i in ctrl.model) {
        if(ctrl.model[i] instanceof Date){
          ctrl.model.shift();
        }
      }
      if(ctrl.model.length === 0 )
        ctrl.model.push(ctrl.commonDatepicker);
      else
        ctrl.model.push(ctrl.commonDatepicker);
      console.log(ctrl.model)

    };


}

angular.module('app')
    .controller('NyaCtrl', NyaCtrl);
