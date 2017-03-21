/**
 * Created by u53686 on 05/03/2017.
 */
'use strict';

savedSearchService.$inject = ['$localStorage']

function savedSearchService($localStorage) {
  $localStorage = $localStorage.$default({
    searches: []
  });
  function set(search) {
    $localStorage.searches.unshift(search)
  }

  function get() {
    return $localStorage.searches;
  }

  function remove() {
     $localStorage.searches = [];
  }

  return {
    set: set,
    get: get,
    remove: remove
  }
}

angular.module('app')
  .factory('savedSearchService',savedSearchService)
