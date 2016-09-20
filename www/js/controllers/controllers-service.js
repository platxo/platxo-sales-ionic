var serviceControllers = angular.module('serviceControllers', []);

serviceControllers.controller('serviceController', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicModal',
  '$rootScope',
  'serviceService',
  'serviceCategoriesService',
  'serviceTypesService',
  function (
    $scope,
    $stateParams,
    $state,
    $ionicModal,
    $rootScope,
    serviceService,
    serviceCategoriesService,
    serviceTypesService
  )
  {
    serviceService.list()
      .$promise
        .then(function (res) {
          $scope.services = res;
        })
    serviceCategoriesService.list()
      .$promise
        .then(function (res) {
          $scope.categories = res;
        })
    serviceTypesService.list()
      .$promise
        .then(function (res) {
          $scope.types = res;
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