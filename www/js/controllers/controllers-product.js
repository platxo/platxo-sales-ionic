var productControllers = angular.module('productControllers', []);

productControllers.controller('productController', [
  '$scope',
  '$state',
  '$rootScope',
  'productService',
  function (
    $scope,
    $state,
    $rootScope,
    productService
  )
  {
    productService.list()
      .$promise
        .then(function (res) {
          $scope.products = res;
        }, function (error) {
          if (error.data.detail === "Signature has expired.") {
            debugger
            $scope.showAlertExpired()
          }
        })

    $scope.detail = function (product) {
      $rootScope.selectedProduct = product;
      $state.go('tab.product-detail', { 'id': product.id });
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'tab.product-list') {
        productService.list()
          .$promise
            .then(function (res) {
              $scope.products = res;
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