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
    $scope.showLoading()
    serviceService.list()
      .$promise
        .then(function (res) {
          $scope.services = res;
          $scope.hideLoading()
        }, function (error) {
          $rootScope.evaluateError()
          $scope.hideLoading()
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
              $rootScope.evaluateError()
            })
      }
    })

  }
]);
