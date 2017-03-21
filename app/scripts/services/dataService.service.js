/**
 * Created by u53686 on 28/02/2017.
 */
'use strict';
dataService.$inject = ['$resource']
function dataService($resource) {


    function get500() {
        return $resource('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json');
    }

    function get10000() {
        return $resource('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/10000_complex.json');
    }

    function get500ById() {
        return $resource('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json', {},
            {
                get: {
                    method: 'GET',
                    params: {id: '@id'},
                    isArray: true,
                    cache: true
                }
            })
    }
    return {
        get500: get500,
        get10000: get10000,
        get500ById: get500ById
    }
}

angular.module('app')
    .factory('dataService',dataService);