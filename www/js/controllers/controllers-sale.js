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
  'businessService',
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
    businessService,
    $rootScope
  )
  {

    $scope.sale = {}
    $scope.cart = {}
    $scope.cart.products = []
    $scope.cart.services = []
    $scope.cart.discount = 0
    $scope.cart.tax = 0
    $scope.cart.totalCart = 0
    $scope.cart.points = 0
    $scope.points = 0
    $scope.filters = {}


    /* LIST SALES */
    saleService.list()
      .$promise
        .then(function (res) {
          $rootScope.sales = res
          $rootScope.listSales = res
          /* LIST CUSTOMERS */
          customerService.list()
            .$promise
              .then(function (res) {
                $scope.customers = res

                /* LIST PRODUCTS */
                productService.list()
                  .$promise
                    .then(function (res) {
                      $scope.products = res
                      for (x in $scope.products) {
                        $scope.products[x].qtySelected = 0
                        $scope.products[x].isChecked = false
                      }
                      /* LIST SERVICES */
                      serviceService.list()
                        .$promise
                          .then(function (res) {
                            $scope.services = res
                            for (x in $scope.services) {
                              $scope.services[x].qtySelected = 0
                              $scope.services[x].isChecked = false
                            }
                          })
                    })
              })
        }, function (error) {
          if (error.data.detail === "Signature has expired.") {
            $rootScope.logout(true)
            $scope.showAlertExpired()
          }
          $scope.sales = []
        })

/*
 *
 * CUSTOMERS
 *
 */

    /* MODAL CUSTOMER LIST */
    $ionicModal.fromTemplateUrl('templates/sale/select-customer.html', {
      scope: $scope,
      controller: 'saleController',
      animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
      focusFirstInput: true
    }).then(function(modal) {
      $scope.customerModal = modal;
    });
    $scope.customerOpenModal = function(applyFilter) {
      if (applyFilter)
        $scope.filterCustomers = true;
      else
        $scope.filterCustomers = false;
      $scope.customerModal.show();
    };
    $scope.customerCloseModal = function() {
      $scope.customerModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.customerModal.remove();
    });

    $scope.selectCustomer = function(customer) {
      $rootScope.currentCustomer = customer
      var haveCRMcount = function () {
        if(customer.points.length > 0) {
          for (x in customer.points) {
            if (customer.points[x].business === $rootScope.currentBusiness) {
              $scope.points = customer.points[x].balance
              $rootScope.maxPercentPoints = $rootScope.maxPercentPoints || JSON.parse(localStorage.getItem("maxPercentPoints"))
              $scope.maxRangePoints = $scope.cart.totalCart * $rootScope.maxPercentPoints /100
              if ($scope.maxRangePoints > $scope.points)
                $scope.maxRangePoints = $scope.points
              return true;
            }
          }
        } else {
          // debugger
          $scope.showAlertCreateAccountCRM()
          return false;
        }
      }
      $scope.showRangePoints = haveCRMcount()
      $scope.sale.customerName = customer.extra.customer_name
      $rootScope.currentCustomer = customer.id
      $scope.customerModal.hide()
    };

    /* ADD CUSTOMER TO BUSINESS */
    $scope.addCustomer = function (customer) {
      debugger
      $rootScope.business = $rootScope.business || JSON.parse(localStorage.getItem("allBusiness"));
      for (x in $rootScope.business) {
        if ($rootScope.currentBusiness === $rootScope.business[x].id) {
          var businessToUpdate = $rootScope.business[x];
        }
      }
      businessToUpdate.customers.push(customer.id)

      businessService.update({id: $rootScope.currentBusiness}, businessToUpdate)
        .$promise
          .then(function(res) {
            $scope.sales = saleService.list();
            $scope.customerModal.hide();
            $state.go('tab.sale-list');
          }, function (error) {
            if (error.data.detail === "Signature has expired.") {
              debugger
            }
            debugger
            $scope.customerModal.hide();
          })
    }


/*
 *
 * PRODUCTS 
 *
 */

    

    /* MODAL PRODUCT LIST */
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
    $scope.$on('$destroy', function() {
      $scope.productmodal.remove();
    });

/*
 *
 * SERVICES 
 *
 */


    /* MODAL SERVICE LIST */
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
    $scope.$on('$destroy', function() {
      $scope.servicemodal.remove();
    });

    $scope.$on('$stateChangeSuccess', function() {
      $scope.sales = saleService.list();
    })

/*
 *
 * SALE 
 *
 */


    $scope.dayFilter = function () {
      $rootScope.salesDay = []
      $rootScope.salesMonth = []
      $rootScope.salesWeek = []
      var currentDate = new Date()
      var currentDay = currentDate.getDay()
      for (x in $rootScope.sales) {
        var dateEvaluate = new Date($rootScope.sales[x].created_at)
        if (dateEvaluate.getDay() === currentDay) {
          $rootScope.salesDay.push($rootScope.sales[x])
        }
      }
      $scope.listSales = $rootScope.salesDay;
    }

    $scope.monthFilter = function () {
      $rootScope.salesDay = []
      $rootScope.salesMonth = []
      $rootScope.salesWeek = []
      var currentDate = new Date()
      var currentMonth = currentDate.getMonth()
      for (x in $rootScope.sales) {
        var dateEvaluate = new Date($rootScope.sales[x].created_at)
        if (dateEvaluate.getMonth() === currentMonth) {
          $rootScope.salesMonth.push($rootScope.sales[x])
        }
      }
      $scope.listSales = $rootScope.salesMonth;
    }

    $scope.weekFilter = function () {
      $rootScope.salesDay = []
      $rootScope.salesMonth = []
      $rootScope.salesWeek = []
      Date.prototype.getWeek = function() {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
      };

      var currentDate = new Date()
      var currentWeek = currentDate.getWeek()
      for (x in $rootScope.sales) {
        var dateEvaluate = new Date($rootScope.sales[x].created_at)
        if (dateEvaluate.getWeek() === currentWeek) {
          $rootScope.salesWeek.push($rootScope.sales[x])
        }
      }
      $scope.listSales = $rootScope.salesWeek;
    }

    /* CREATE SALE */
    $scope.create = function (cart) {
      // Parser products
      var products = cart.products.map(function (product) {
        var obj = {id: product.item.id, qty: product.qty}
        return obj
      })
      // Parser services
      var services = cart.services.map(function (service) {
        var obj = {id: service.item.id, qty: service.qty}
        return obj
      })
      // Construct order post
      debugger
      var order = {
        order: {
          payment_method : "cash",
          customer: $rootScope.currentCustomer,
          business: $rootScope.currentBusiness,
          employee:  $rootScope.currentEmployee.id,
          products: products,
          services: services,
          total_discount: cart.discount,
          customer_points: cart.points
        }
      }
      // Create order
      saleService.create(order)
        .$promise
          .then(function(res) {
            $scope.sales = saleService.list();
            $state.go('tab.sale-list');
          }, function (error) {
            if (error.data.detail === "Signature has expired.") {
              debugger
            }
          })
    }

    /* UPDATE SALE */
    $scope.update = function (sale, confirm) {
      if (!confirm) {
        $rootScope.selectedSale = sale;
        $state.go('tab.sale-update', {'id': sale.id});
      } else {
        saleService.update($rootScope.selectedSale)
          .$promise
            .then(function(res) {
              $scope.sales = saleService.list();
              $state.go('tab.sale-list');
            }, function (error) {
              if (error.data.detail === "Signature has expired.") {
                debugger
              }
            })
      }
    }

    /* DETAIL SALE */
    $scope.detail = function (sale) {
      $rootScope.selectedSale = sale;
      $state.go('tab.sale-detail', {'id': sale.id});
    }

    $scope.cancel = function () {
      $state.go('tab.sale-list');
    }


    /* BUTTON ADD */
    $scope.addItem = function (product,service) {
      if (product) {
        var selectActual = filterCartById(product,null)
        if (!selectActual) {
          product.qtySelected = 1;
          product.isChecked = true;
          $scope.cart.products.push({ item: product, qty: 1 });
        } else {
          selectActual.qty++;
          product.qtySelected++;
        }
        product.qty--;
        console.log($scope.cart.products);
      }
      if (service) {
        var selectActual = filterCartById(null,service)
        if (!selectActual) {
          service.qtySelected = 1;
          service.isChecked = true;
          $scope.cart.services.push({ item: service});
        } else service.qtySelected++;
        console.log($scope.cart.services);
      }
      getCartTotal();
    }

    /* BUTTON REMOVE */
    $scope.removeItem = function (product,service) {
      if (product) {
        var selectActual = filterCartById(product,null)
        if (selectActual) {
          if (selectActual.qty === 1) {
            if (filterCartByIndex(product,null) != undefined) {
              product.qtySelected = 0;
              product.isChecked = false;
              $scope.cart.products.splice(filterCartByIndex(product,null),1);
            }
          } else {
            selectActual.qty--;
            product.qtySelected--;
          }
        } 
        product.qty++;
        console.log($scope.cart.products);
      }
      if (service) {
        var selectActual = filterCartById(null,service)
        if (selectActual) {
          if (selectActual.item.qtySelected === 1) {
            if (filterCartByIndex(null,service) != undefined) {
              service.qtySelected = 0;
              service.isChecked = false;
              $scope.cart.services.splice(filterCartByIndex(null,service),1);
            }
          } else service.qtySelected--;
        } 
        console.log($scope.cart.services);
      }
      getCartTotal();
    }

    /* FILTER IF THERE ITEM IN CART */
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

    /* FILTER ITEM POSITION IN CART ARRAY */
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

    /* TOTAL PRICE CART */
    function getCartTotal () {
      $scope.cart.totalCart = 0;
      $scope.cart.tax = 0;
      for (var i = 0; i < $scope.cart.products.length; i++) {
        var acum = $scope.cart.products[i].item.retail_price * $scope.cart.products[i].qty
        $scope.cart.totalCart += acum
        if ($scope.cart.products[i].item.extra)
          var tax =  $scope.cart.products[i].item.extra.tax_rate || 0
        else  var tax = 0
        $scope.cart.acumTax = (acum * tax) / 100
        $scope.cart.tax += $scope.cart.acumTax
      }
      for (var i = 0; i < $scope.cart.services.length; i++) {
        var acum = $scope.cart.services[i].item.price * $scope.cart.services[i].item.qtySelected;
        $scope.cart.totalCart += acum
        if ($scope.cart.services[i].item.extra)
          var tax =  $scope.cart.services[i].item.extra.tax_rate || 0
        else  var tax = 0
        $scope.cart.acumTax = (acum * tax) / 100
        $scope.cart.tax += $scope.cart.acumTax
      }
      $rootScope.maxPercentPoints = $rootScope.maxPercentPoints || JSON.parse(localStorage.getItem("maxPercentPoints"))
      $scope.maxRangePoints = $scope.cart.totalCart * $rootScope.maxPercentPoints /100
      if ($scope.maxRangePoints > $scope.points)
        $scope.maxRangePoints = $scope.points
      return true
    }

  }
]);

