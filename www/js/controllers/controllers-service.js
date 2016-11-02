var serviceControllers = angular.module('serviceControllers', []);

serviceControllers.controller('serviceController', [
  '$scope',
  '$state',
  '$rootScope',
  'serviceService',
  function (
    $scope,
    $state,
    $rootScope,
    serviceService
  )
  {
    serviceService.list()
      .$promise
        .then(function (res) {
          $scope.services = res;
        }, function (error) {
          if (error.data.detail === "Signature has expired.") {
            debugger
            if(!$rootScope.goToLogin) {
              $scope.showAlertExpired()
            }
          }
        })

    $scope.detail = function (service) {
      $rootScope.selectedService = service;
      $state.go('tab.service-detail', { 'id': service.id });
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'tab.service-list') {
        serviceService.list()
          .$promise
            .then(function (res) {
              $scope.services = res;
            }, function (error) {
              if (error.data.detail === "Signature has expired.") {
                debugger
                $scope.showAlertExpired()
              }
            })
      }
    })

  }
]);