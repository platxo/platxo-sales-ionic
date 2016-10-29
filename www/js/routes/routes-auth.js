var authRoutes = angular.module('authRoutes', []);

authRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })    
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/auth/auth-signup.html',
      controller: 'signupController'
    })
    .state('login', {
      url: '/login',
      cache: 'false',
      templateUrl: 'templates/auth/auth-login.html',
      controller: 'loginController'
    })

  $urlRouterProvider.otherwise('/login');

}]);
