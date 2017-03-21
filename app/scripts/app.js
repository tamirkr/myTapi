'use strict';

/**
 * @ngdoc overview
 * @name untitledApp
 * @description
 * # untitledApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
      'ngSanitize',
      'ngQuantum',
      'ngAnimate',
      'ngTouch',
      'ui.router',
      'ngResource',
      'ui.grid',
      'ui.grid.grouping',
      'ui.grid.edit',
      'ui.grid.selection',
      'ui.grid.pagination',
      'ui.grid.infiniteScroll',
      'nya.bootstrap.select',
      'oitozero.ngSweetAlert',
      'ui.bootstrap',
      'ngStorage',
      'pascalprecht.translate'
  ]).config([
      '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$datepickerProvider',
    '$translateProvider',function ($stateProvider, $urlRouterProvider, $locationProvider, $datepickerProvider, $translateProvider) {

    var mydefaults = {
      format:'DD/MM/YYYY',
      placement:'bottom-right',
      allowWrite: true,
      effect:'slide',
      showArrow: true,
      minYear: 1990,
      maxYear: 2012,
      closeIcon: 'fic fu-angle-r',
      theme: 'danger'
    }

    angular.extend($datepickerProvider.defaults, mydefaults);

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: true,
        rewriteLinks: true
    });

    $urlRouterProvider.otherwise('/warnings');

    $stateProvider
        .state('warnings', {
            url: '/warnings',
            templateUrl: 'views/nya.html',
            controllerAs: 'vm',
            controller: 'NyaCtrl'
        })
        .state('details', {
          url: '/warnings/:id',
          templateUrl: 'views/userDetails.html',
          controllerAs: 'vm',
          controller: 'UserDetailsCtrl'
        });



    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('he');
    $translateProvider.useSanitizeValueStrategy('escape');


}]).constant('DATA_URL', function () {
    return 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json';

})

