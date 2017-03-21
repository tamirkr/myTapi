/**
 * Created by u53686 on 15/03/2017.
 */


function lastSearchService() {
  var data = [];

  function set(search) {
    data = search;
  }

  function get() {
    return data;
  }

  function remove() {
    data = [];
  }

  return {
    set: set,
    get: get,
    remove: remove
  }
}

angular.module('app')
  .factory('lastSearchService', lastSearchService);
