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
        }, function (error) {
          if (error.data.detail === "Signature has expired.") {
            debugger
          }
        })
    serviceCategoriesService.list()
      .$promise
        .then(function (res) {
          $scope.categories = res;
        }, function (error) {
          if (error.data.detail === "Signature has expired.") {
            debugger
          }
        })
    serviceTypesService.list()
      .$promise
        .then(function (res) {
          $scope.types = res;
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