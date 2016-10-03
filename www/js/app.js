// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var sales = angular.module('sales', [
  'ionic',
  'ngCordova',
  'saleControllers',
  'saleRoutes',
  'saleServices',
  'productControllers',
  'productServices',
  'serviceControllers',
  'serviceServices',
  'businessControllers',
  'businessRoutes',
  'businessServices',
  'authControllers',
  'authServices',
  'authRoutes'
])

sales.run(function($ionicPlatform, $rootScope, $location, $state) {
  $rootScope.version = 'http://development.';
  $rootScope.baseUrl = 'platxo-bi.appspot.com';
  $rootScope.token = JSON.parse(localStorage.getItem("token")) || '';
  $rootScope.currentUser = JSON.parse(localStorage.getItem("user")) || '';
  $rootScope.currentEmployee = $rootScope.currentUser.employee || '';
  $rootScope.currentBusiness = JSON.parse(localStorage.getItem("currentBusiness")) || '';
  $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token}

  $ionicPlatform.ready(function() {

    $rootScope.logout = function(forced) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('allBusiness');
      localStorage.removeItem('currentBusiness');
      localStorage.removeItem('maxPercentPoints');
      if (!forced) $location.path('/login');
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
        $scope.popover.modalEl.className = "popover"
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

    }
  }
}])

.directive('search', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/search.html'
  }
})

.directive('expired', [ '$ionicPopup', '$rootScope', '$location', function ($ionicPopup, $rootScope, $location) {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/expired.html',
    controller: function ($scope) {
        // debugger
      $scope.showAlertExpired = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Expired Session!',
          template: 'Login Please'
        });

        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
          $location.path('/login');
        })
      }
    }
  }
}])


.directive('created', [ '$ionicPopup', '$rootScope', '$location', function ($ionicPopup, $rootScope, $location) {
  return {
    restrict: 'E',
    controller: function ($scope) {
        // debugger
      $scope.showAlertCreateAccountCRM = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Create account CRM',
          template: 'Add account CRM'
        });

        alertPopup.then(function(res) {
          // POST api/points
          console.log('Has created account CRM');
        })
      }
    }
  }
}])