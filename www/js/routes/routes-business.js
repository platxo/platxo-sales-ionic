var businessRoutes = angular.module('businessRoutes', []);

businessRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('business-list', {
    url: '/business-list',
    templateUrl: 'templates/business/select-business.html',
    controller: 'businessController'
  })
  // .state('business-detail', {
  //   url: '/business-detail/:id',
  //   templateUrl: 'templates/business/business-detail.html',
  //   controller: 'businessController'
  // })
  // .state('business-update', {
  //   url: '/business-update/:id',
  //   templateUrl: 'templates/business/business-update.html',
  //   controller: 'businessController'
  // })

}]);