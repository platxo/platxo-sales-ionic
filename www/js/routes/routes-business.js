var businessRoutes = angular.module('businessRoutes', []);

businessRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('business-list', {
    url: '/business-list',
    templateUrl: 'templates/business/business-list.html',
    controller: 'businessListCtrl'
  })
  .state('business-detail', {
    url: '/business-detail/:id',
    templateUrl: 'templates/business/business-detail.html'
  })
}]);