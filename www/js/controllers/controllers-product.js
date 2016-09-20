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
    productService.list()
      .$promise
        .then(function (res) {
          $scope.products = res;
        })
    productCategoriesService.list()
      .$promise
        .then(function (res) {
          $scope.categories = res;
        })
    productTypesService.list()
      .$promise
        .then(function (res) {
          $scope.types = res;
        })

    $scope.detail = function (product) {
      $rootScope.selectedProduct = product;
      $state.go('tab.product-detail', { 'id': product.id });
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.products = productService.list();
    })

  }
]);