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
          }
        })

    $scope.detail = function (service) {
      $rootScope.selectedService = service;
      $state.go('tab.service-detail', { 'id': service.id });
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.services = serviceService.list();
    })

  }
]);