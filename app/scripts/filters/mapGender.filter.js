/**
 * Created by u53686 on 27/02/2017.
 */
angular.module('app')
    .filter('mapGender', function () {
        var genderHash = {
            1: 'male',
            2: 'female'
        };

        return function(input) {
            var result;
            var match;
            if (!input){
                return '';
            } else if (result = genderHash[input]) {
                return result;
            } else if ( ( match = input.match(/(.+)( \(\d+\))/) ) && ( result = genderHash[match[1]] ) ) {
                return result + match[2];
            } else {
                return input;
            }
        };
    })