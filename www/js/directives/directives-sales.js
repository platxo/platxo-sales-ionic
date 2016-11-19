var salesDirectives = angular.module('salesDirectives', []);

salesDirectives.directive('menu', [ '$ionicPopover', '$rootScope', function ($ionicPopover, $rootScope) {
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

salesDirectives.directive('search', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/search.html'
  }
})

salesDirectives.directive('expired', [ '$ionicPopup', '$rootScope', '$location', function ($ionicPopup, $rootScope, $location) {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/expired.html',
    controller: function ($scope) {
      $rootScope.showAlertExpired = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Expired Session!',
          template: 'Login Please'
        });

        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
          $rootScope.logout()
        })
      }
    }
  }
}])

salesDirectives.directive('created', [ '$ionicPopup', '$rootScope', '$location', function ($ionicPopup, $rootScope, $location) {
  return {
    restrict: 'E',
    controller: function ($scope) {
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

salesDirectives.directive('loading', [ '$ionicPopup', '$rootScope', '$ionicLoading', function ($ionicPopup, $rootScope, $ionicLoading) {
  return {
    restrict: 'E',
    controller: function ($scope) {
      $scope.showLoading = function () {
        $ionicLoading.show({
          template: '<ion-spinner icon="android" class="spinner-balanced"></ion-spinner>',
          noBackdrop: true
        });
      }

      $scope.hideLoading = function () {
        $ionicLoading.hide();
      }
    }
  }
}])