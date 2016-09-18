var businessRoutes = angular.module('businessRoutes', []);

businessRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('business-list', {
    url: '/business-list',
    templateUrl: 'templates/business/select-business.html',
    controller: 'businessController'
  })
}]);