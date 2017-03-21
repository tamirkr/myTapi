'use strict';

/**
 * @ngdoc function
 * @name untitledApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the untitledApp
 */
angular.module('app')
.controller('MainCtrl', [ '$http', '$interval', 'uiGridGroupingConstants', 'DATA_URL', function ($http, $interval, uiGridGroupingConstants, DATA_URL ) {
    var ctrl = this;

    ctrl.gridOptions = {
        enableFiltering: true,
        treeRowHeaderAlwaysVisible: false,
        enablePaginationControls: false,
        paginationPageSize: 25,
        columnDefs: [
            { name: 'name', width: '30%' },
            { name: 'gender', grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' }, width: '20%', cellFilter: 'mapGender' },
            { name: 'age', treeAggregationType: uiGridGroupingConstants.aggregation.MAX, width: '20%' },
            { name: 'company', width: '25%' },
            { name: 'registered', width: '40%', cellFilter: 'date', type: 'date' },
            { name: 'state', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'desc' }, width: '35%', cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
            { name: 'balance', width: '25%', cellFilter: 'currency', treeAggregationType: uiGridGroupingConstants.aggregation.AVG, customTreeAggregationFinalizerFn: function( aggregation ) {
                aggregation.rendered = aggregation.value;
            } }
        ],
        onRegisterApi: function( gridApi ) {
            ctrl.gridApi = gridApi;
        }
    };

    ctrl.gridOptions.onRegisterApi = function (gridApi) {
        ctrl.gridApi = gridApi;
    }

    $http.get(DATA_URL())
        .success(function(data) {
            for ( var i = 0; i < data.length; i++ ){
                var registeredDate = new Date( data[i].registered );
                data[i].state = data[i].address.state;
                data[i].gender = data[i].gender === 'male' ? 1: 2;
                data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
                data[i].registered = new Date( registeredDate.getFullYear(), registeredDate.getMonth(), 1 )
            }
            delete data[2].age;
            ctrl.gridOptions.data = data;
        });

    ctrl.expandAll = function(){
        ctrl.gridApi.treeBase.expandAllRows();
    };

    ctrl.toggleRow = function( rowNum ){
        ctrl.gridApi.treeBase.toggleRowTreeState(ctrl.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
    };

    ctrl.changeGrouping = function() {
        ctrl.gridApi.grouping.clearGrouping();
        ctrl.gridApi.grouping.groupColumn('age');
        ctrl.gridApi.grouping.aggregateColumn('state', uiGridGroupingConstants.aggregation.COUNT);
    };

    ctrl.getAggregates = function() {
        var aggregatesTree = [];
        var gender

        var recursiveExtract = function( treeChildren ) {
            return treeChildren.map( function( node ) {
                var newNode = {};
                angular.forEach(node.row.entity, function( attributeCol ) {
                    if( typeof(attributeCol.groupVal) !== 'undefined' ) {
                        newNode.groupVal = attributeCol.groupVal;
                        newNode.aggVal = attributeCol.value;
                    }
                });
                newNode.otherAggregations = node.aggregations.map( function( aggregation ) {
                    return { colName: aggregation.col.name, value: aggregation.value, type: aggregation.type };
                });
                if( node.children ) {
                    newNode.children = recursiveExtract( node.children );
                }
                return newNode;
            });
        }

        aggregatesTree = recursiveExtract( ctrl.gridApi.grid.treeBase.tree );

        // console.log(aggregatesTree);
    };
}])

