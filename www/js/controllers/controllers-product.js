var productControllers = angular.module('productControllers', []);

productControllers.controller('productController', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicModal',
  '$rootScope',
  'productService',
  'categoryService',
  'typeService',
  function (
    $scope,
    $stateParams,
    $state,
    $ionicModal,
    $rootScope,
    productService,
    categoryService,
    typeService
  )
  {
    $scope.products = productService.list();
    $scope.categories = categoryService.list();
    $scope.types = typeService.list();
    $scope.product = productService.detail({id: $stateParams.id})

    $scope.cancel = function () {
      $state.go('tab.product-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.products = productService.list();
    })

  }
]);