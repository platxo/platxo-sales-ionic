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
    $scope.customers = customerService.list();
    $scope.products = productService.list();
    $scope.services = serviceService.list();
    $scope.sale = {}
    // var servicio = {};
        // servicio.cart = [];
    $scope.cart = {}
    $scope.cart.products = []
    $scope.cart.services = []



    $scope.create = function () {
      debugger
      $scope.sale.user = $rootScope.currentUser.url
      $scope.sale.total = 45000;
      saleService.create($scope.sale);
      $scope.sales = saleService.list();
      $state.go('tab.sale-list');
    }

    $scope.update = function (sale, confirm) {
      if (!confirm) {
        $rootScope.selectedSale = sale;
        $state.go('tab.sale-update', {'id': sale.id});
      } else {
        saleService.update($rootScope.selectedSale);
        $scope.sales = saleService.list();
        $state.go('tab.sale-list');
      }
    }

    $scope.delete = function (sale, confirm) {
      if (!confirm) {
        $rootScope.selectedSale = sale;
        $state.go('tab.sale-delete', {'id': sale.id});
      } else {
        saleService.delete($rootScope.selectedSale);
        $scope.sales = saleService.list();
        $state.go('tab.sale-list');
      }
    }

    $scope.cancel = function () {
      $state.go('tab.sale-list');
    }

    $scope.detail = function (sale) {
      $rootScope.selectedSale = sale;
      $state.go('tab.sale-detail', {'id': sale.id});
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
      controller: 'productController',
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
      $scope.productsSelected.push(product)
    };

    // BUTTON ADD
    $scope.addItem = function (product,service) {
      debugger
      if (product) {
        $scope.currentProduct = product;
        var selectActual = filterCartById(product,null)
        if (!selectActual) {
          product.qtySelected = 1;
          $scope.cart.products.push({ item: product, qty: 1 });
        } else {
          selectActual.qty++;
          product.qtySelected++;
        }
        // $scope.products++;
        $scope.currentProduct.qty--;
        console.log($scope.cart.products);
      }
      if (service) {
        $scope.currentService = service;
        var selectActual = filterCartById(null,service)
        if (!selectActual) {
          service.qtySelected = 1;
          $scope.cart.services.push({ item: service, qty: 1 });
        } else {
          selectActual.qty++;
          service.qtySelected++;
        }
        // $scope.services++;
        $scope.currentService.qty--;
        console.log($scope.cart.services);
      }
    }

    // BUTTON REMOVE
    $scope.removeItem = function (product,service) {
      debugger
      if (product) {
        $scope.currentProduct = product;
        var selectActual = filterCartById(product,null)
        if (selectActual) {
          if (selectActual.qty === 1) {
            if (filterCartByIndex(product,null) != undefined) {
              product.qtySelected = 0;
              $scope.cart.products.splice(filterCartByIndex(product,null),1);
            }
          } else {
            selectActual.qty--;
            product.qtySelected--;
          }
        } 
        $scope.currentProduct.qty++;
        console.log($scope.cart.products);
      }
      if (service) {
        $scope.currentService = service;
        var selectActual = filterCartById(null,service)
        if (selectActual) {
          if (selectActual.qty === 1) {
            if (filterCartByIndex(null,service) != undefined) {
              service.qtySelected = 0;
              $scope.cart.products.splice(filterCartByIndex(null,service),1);
            }
          } else {
            selectActual.qty--;
            service.qtySelected--;
          }
        } 
        $scope.currentService.qty++;
        console.log($scope.cart.products);
      }
    }

    // FILTER IF THERE ITEM IN CART
    function filterCartById (product,service) {
      if (product) {
        for (var i = 0; i < $scope.cart.products.length; i++) {
          if ($scope.cart.products[i].item.id === product.id && $scope.cart.products[i].item.name  === product.name)
            return $scope.cart.products[i]
        }
        return null
      }
      if (service) {
        for (var i = 0; i < $scope.cart.services.length; i++) {
          if ($scope.cart.services[i].item.id === service.id && $scope.cart.services[i].item.name  === service.name)
            return $scope.cart.services[i]
        }
        return null
      }
    }

    // FILTER ITEM POSITION IN CART ARRAY
    function filterCartByIndex (product,service) {
      if (product) {
        for (var i = 0; i < $scope.cart.products.length; i++)
          if ($scope.cart.products[i].item.id === product.id && $scope.cart.products[i].item.name === product.name)
            return i
      }
      if (service) {
        for (var i = 0; i < $scope.cart.services.length; i++)
          if ($scope.cart.services[i].item.id === service.id && $scope.cart.services[i].item.name === service.name)
            return i
      }
    }

    //Modal Service List
    $ionicModal.fromTemplateUrl('templates/sale/select-service.html', {
      scope: $scope,
      controller: 'serviceController',
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