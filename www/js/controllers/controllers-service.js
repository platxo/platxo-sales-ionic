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
    $scope.services = serviceService.list();
    $scope.categories = serviceCategoriesService.list();
    $scope.types = serviceTypesService.list();

    $scope.detail = function (service) {
      $rootScope.selectedService = service;
      $state.go('tab.service-detail', { 'id': service.id });
    }

    $scope.cancel = function () {
      $state.go('tab.service-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.services = serviceService.list();
    })

  }
]);