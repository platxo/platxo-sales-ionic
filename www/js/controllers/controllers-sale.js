var saleControllers = angular.module('saleControllers', []);

saleControllers.controller('saleController', [
  '$scope',
  '$stateParams',
  '$state',
  'saleService',
  'productService',
  'serviceService',
  '$ionicModal',
  function(
    $scope,
    $stateParams,
    $state,
    saleService,
    productService,
    serviceService,
    $ionicModal
  )
  {
    $scope.sales = saleService.list();
    $scope.sale = saleService.detail({id: $stateParams.id});
    $scope.products = productService.list();
    $scope.services = serviceService.list();

    $scope.create = function () {
      saleService.create($scope.sale);
      $scope.sales = saleService.list();
      $state.go('tab.sale-list');
    }

    $scope.update = function () {
      saleService.update($scope.sale);
      $scope.sales = saleService.list();
      $state.go('tab.sale-list');
    }

    $scope.delete = function () {
      saleService.delete($scope.sale);
      $scope.sales = saleService.list();
      $state.go('tab.sale-list');
    }

    $scope.cancel = function () {
      $state.go('tab.sale-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sales = saleService.list();
    })

    //Modal Product List
    $ionicModal.fromTemplateUrl('templates/sale/select-product.html', {
      scope: $scope,
      controller: 'saleController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.productmodal = modal;
    });
    $scope.productOpenModal = function() {
      $scope.productmodal.show();
    };
    $scope.productCloseModal = function() {
      $scope.productmodal.hide();
    };
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.productmodal.remove();
    });

    $scope.sale.products = [];
    $scope.selectProduct = function(product) {
      $scope.sale.products.push(product.url)
    };

    //Modal Service List
    $ionicModal.fromTemplateUrl('templates/sale/select-service.html', {
      scope: $scope,
      controller: 'saleController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.servicemodal = modal;
    });
    $scope.serviceOpenModal = function() {
      $scope.servicemodal.show();
    };
    $scope.serviceCloseModal = function() {
      $scope.servicemodal.hide();
    };
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.servicemodal.remove();
    });

    $scope.sale.services = [];
    $scope.selectService = function(service) {
      $scope.sale.services.push(service.url)
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sales = saleService.list();
    })

  }
]);