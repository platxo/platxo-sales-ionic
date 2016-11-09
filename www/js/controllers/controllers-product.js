var productControllers = angular.module('productControllers', []);

productControllers.controller('productController', [
  '$scope',
  '$state',
  '$rootScope',
  'productService',
  '$cordovaPrinter',
  function (
    $scope,
    $state,
    $rootScope,
    productService,
    $cordovaPrinter
  )
  {
    $scope.showLoading()
    $scope.storagecode = 'https://storage.googleapis.com/platxo-bi.appspot.com/product/code';
    productService.list()
      .$promise
        .then(function (res) {
          $scope.products = res;
          $scope.hideLoading()
        }, function (error) {
          $rootScope.evaluateError(error)
          $scope.hideLoading()
        })

    $scope.refresh = function () {
      productService.list()
        .$promise
          .then(function (res) {
            $scope.products = res
            $scope.$broadcast('scroll.refreshComplete');
          }, function (err) {
            $rootScope.evaluateError(error)
          })
    }

    $scope.detail = function (product) {
      $rootScope.selectedProduct = product;
      $state.go('tab.product-detail', { 'id': product.id });
    }

    $scope.print = function() {
        if($cordovaPrinter.isAvailable()) {
            $cordovaPrinter.print($scope.storagecode + '/' + $scope.product.id + '.png');
        } else {
            alert("Printing is not available on device");
        }
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'tab.product-list') {
        productService.list()
          .$promise
            .then(function (res) {
              $scope.products = res;
            }, function (error) {
              $rootScope.evaluateError(error)
            })
      }
    })

  }
]);