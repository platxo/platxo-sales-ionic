var productControllers = angular.module('productControllers', []);

productControllers.controller('productController', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicModal',
  '$rootScope',
  'productService',
  'productCategoriesService',
  'productTypesService',
  function (
    $scope,
    $stateParams,
    $state,
    $ionicModal,
    $rootScope,
    productService,
    productCategoriesService,
    productTypesService
  )
  {
    $scope.products = productService.list();
    $scope.product = productService.detail({id: $stateParams.id})
    $scope.categories = productCategoriesService.list();
    $scope.types = productTypesService.list();

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.products = productService.list();
    })

  }
]);