var saleControllers = angular.module('saleControllers', []);

saleControllers.controller('saleController', [
  '$scope',
  '$stateParams',
  '$state',
  'saleService',
  'productService',
  'serviceService',
  '$ionicModal',
  'customerService',
  '$rootScope',
  function (
    $scope,
    $stateParams,
    $state,
    saleService,
    productService,
    serviceService,
    $ionicModal,
    customerService,
    $rootScope
  )
  {
    $scope.sales = saleService.list();
    $scope.sale = saleService.detail({id: $stateParams.id});
    $scope.customers = customerService.list();
    $scope.products = productService.list();
    $scope.services = serviceService.list();

    $scope.create = function () {
      $scope.sale.user = $rootScope.currentUser.url
      $scope.sale.total = 45000;
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

    //Modal customer List
    $ionicModal.fromTemplateUrl('templates/sale/select-customer.html', {
      scope: $scope,
      controller: 'saleController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.customerModal = modal;
    });
    $scope.customerOpenModal = function() {
      $scope.customerModal.show();
    };
    $scope.customerCloseModal = function() {
      $scope.customerModal.hide();
    };
    // Cleanup the modal when we're done with it! detecta cambios
    $scope.$on('$destroy', function() {
      $scope.customerModal.remove();
    });

    $scope.selectCustomer = function(customer) {
      $scope.sale.customerName = customer.username;
      // $scope.sale.customer = customer.url;
      $scope.customerModal.hide();
    };

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
    $scope.productsSelected = [];
    $scope.selectProduct = function(product) {
      $scope.sale.products.push(product.url)
      $scope.productsSelected.push(product.name)
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
    $scope.servicesSelected = [];
    $scope.selectService = function(service) {
      $scope.sale.services.push(service.url)
      $scope.servicesSelected.push(service.name)
    };

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sales = saleService.list();
    })

  }
]);