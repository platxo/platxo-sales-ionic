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
    var servicio = {};
        servicio.cart = [];


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
    $scope.addItem = function (item) {
      $scope.currentItem = item;
      var selectActual = filterCartById(item)
      if (!selectActual) {
        servicio.cart.push({ itemCart: item, quantity: 1 });
      } else selectActual.quantity++;

      // $scope.products++;
      $scope.currentItem.quantity--;
      console.log(servicio.cart);
    }

    // BUTTON REMOVE
    $scope.removeItem = function (item) {
      $scope.currentItem = item;
      var selectActual = filterCartById(item)
      if (selectActual) {
        if (selectActual.quantity === 1) {
          if (filterCartByIndex(item) != undefined) {
            servicio.cart.splice(filterCartByIndex(item),1);
          }
        } else selectActual.quantity--;
      } else {
        servicio.cart.splice(filterCartByIndex(item),1);
      }
      // $scope.products--;
      $scope.currentItem.quantity++;
      console.log(servicio.cart);
    }

    // FILTER IF THERE ITEM IN CART
    function filterCartById (item) {
      for (var i = 0; i < servicio.cart.length; i++) {
        if (servicio.cart[i].itemCart.id === item.id && servicio.cart[i].itemCart.name  === item.name)
          return servicio.cart[i]
      }
      return null
    }

    // FILTER ITEM POSITION IN CART ARRAY
    function filterCartByIndex (item) {
      for (var i = 0; i < servicio.cart.length; i++)
        if (servicio.cart[i].itemCart.id === item.id && servicio.cart[i].itemCart.name === item.name)
          return i        
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