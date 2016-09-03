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
    $scope.categories = productCategoriesService.list();
    $scope.types = productTypesService.list();

    $scope.detail = function (product) {
      $rootScope.selectedProduct = product;
      $state.go('tab.product-detail', { 'id': product.id });
    }

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.products = productService.list();
    })

  }
]);