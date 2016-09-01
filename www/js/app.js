// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var sales = angular.module('sales', [
  'ionic',
  'ngCordova',
  'saleControllers',
  'saleServices',
  'productControllers',
  'productServices',
  'serviceServices',
  'categoryServices',
  'typeServices',
  'saleRoutes',
  'authControllers',
  'authServices',
  'authRoutes'
])

sales.run(function($ionicPlatform, $rootScope, $location) {
  $ionicPlatform.ready(function() {
    $rootScope.token = JSON.parse(localStorage.getItem("token"));
    $rootScope.currentUser = JSON.parse(localStorage.getItem("user"));
    $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token}

    $rootScope.logout = function() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      $location.path('/login');
    };

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.directive('menu', [ '$ionicPopover', '$rootScope', function ($ionicPopover, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/menu.html',
    controller: function ($scope) {
      $ionicPopover.fromTemplateUrl('templates/partials/menu.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
      });

      $scope.menu = function($event) {
        // debugger
        $scope.popover.show($event);
      };

      $scope.closeMenu = function(logout) {
        $scope.popover.hide();
        if (logout) {
          $rootScope.logout();
        }
      };

      //Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.popover.remove();
      });
      // Execute action on hide popover
      $scope.$on('popover.hidden', function() {
        // Execute action
      });
      // Execute action on remove popover
      $scope.$on('popover.removed', function() {
        // Execute action
      });

    }
  }
}])

.directive('search', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/search.html'
  }
})
