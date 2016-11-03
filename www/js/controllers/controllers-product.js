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
    $scope.showLoading()
    productService.list()
      .$promise
        .then(function (res) {
          $scope.products = res;
          $scope.hideLoading()
        }, function (error) {
          $rootScope.evaluateError()
          $scope.hideLoading()
        })

    $scope.refresh = function () {
      productService.list()
        .$promise
          .then(function (res) {
            $scope.products = res
            $scope.$broadcast('scroll.refreshComplete');
          }, function (err) {
            $rootScope.evaluateError()
          })
    }

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
              $rootScope.evaluateError()
            })
      }
    })

  }
]);