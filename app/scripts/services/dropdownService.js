'use strict';

angular.module('app')
    .factory('dropdownService',['$http', '$q', function ($http, $q) {
        function getDropdownData() {
            var url = "./scripts/data/names.json";
            var dfd = $q.defer();

            $http.get(url)
                .then(function (data) {
                    dfd.resolve(data.data);
                })

            return dfd.promise;

        }

        return {
            getDropdownData: getDropdownData
        }
    }])
