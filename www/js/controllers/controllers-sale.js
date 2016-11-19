var saleControllers = angular.module('saleControllers', []);

saleControllers.controller('saleController', [
  '$scope',
  '$state',
  'saleService',
  '$rootScope',
  function (
    $scope,
    $state,
    saleService,
    $rootScope
  )
  {
    $scope.showLoading()
    $scope.filters = {}
    /* LIST SALES */
    saleService.list()
      .$promise
        .then(function (res) {
          $rootScope.sales = res
          $rootScope.listSales = res
          $scope.hideLoading()
        }, function (error) {
          $rootScope.evaluateError(error)
          $scope.hideLoading()
        })

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
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        var week1 = new Date(date.getFullYear(), 0, 4);
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

    /* DETAIL SALE */
    $scope.detail = function (sale) {
      $rootScope.selectedSale = sale;
      $state.go('tab.sale-detail', {'id': sale.id});
    }

    $scope.refresh = function () {
      saleService.list()
        .$promise
          .then(function (res) {
            $rootScope.sales = res
            $rootScope.listSales = res
            $scope.$broadcast('scroll.refreshComplete');
          }, function (error) {
            $rootScope.evaluateError(error)
          })
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'tab.sale-list') {
        saleService.list()
          .$promise
            .then(function (res) {
              $scope.sales = res;
              $rootScope.listSales = res
            }, function (error) {
              $rootScope.evaluateError(error)
            })
      }
    })

  }
])

saleControllers.controller('saleCreateCtrl', [
  '$scope',
  '$state',
  'saleService',
  'productService',
  'serviceService',
  '$ionicModal',
  'customerService',
  'businessService',
  '$rootScope',
  '$cordovaBarcodeScanner',
  '$location',
  function (
    $scope,
    $state,
    saleService,
    productService,
    serviceService,
    $ionicModal,
    customerService,
    businessService,
    $rootScope,
    $cordovaBarcodeScanner,
    $location
  )
  {
    $scope.showLoading()
    $scope.sale = {}
    $scope.cart = {}
    $scope.cart.products = []
    $scope.cart.services = []
    $scope.cart.discount = 0
    $scope.cart.discountValue = 0
    $scope.toggleCashPercent = false
    $scope.cart.tax = 0
    $scope.cart.totalCart = 0
    $scope.cart.points = 0
    $scope.points = 0

    /* LIST CUSTOMERS */
    customerService.list()
      .$promise
        .then(function (res) {
          $scope.customers = res
          /* LIST PRODUCTS */
          productService.list()
            .$promise
              .then(function (res) {
                $scope.hideLoading()
                $scope.products = res
                for (var i = $scope.products.length - 1; i >= 0; i--) {
                  $scope.products[i].qtySelected = 0
                  $scope.products[i].isChecked = false
                }
                /* LIST SERVICES */
                serviceService.list()
                  .$promise
                    .then(function (res) {
                      $scope.services = res
                      for (var i = $scope.services.length - 1; i >= 0; i--) {
                        $scope.services[i].qtySelected = 0
                        $scope.services[i].isChecked = false
                      }
                    })
              })
        }, function (error) {
          debugger
          $rootScope.evaluateError(error)
          $scope.hideLoading()
          $scope.sales = {}
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
      focusFirstInput: false
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
            if (customer.points[x].business === $rootScope.currentBusiness.id) {
              $scope.points = customer.points[x].balance
              $rootScope.maxPercentPoints = $rootScope.maxPercentPoints || JSON.parse(localStorage.getItem("maxPercentPoints"))
              $scope.maxRangePoints = $scope.cart.totalCart * $rootScope.maxPercentPoints /100
              if ($scope.maxRangePoints > $scope.points)
                $scope.maxRangePoints = $scope.points
              return true;
            }
          }
        } else {
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
      $rootScope.business = $rootScope.business
      for (x in $rootScope.business) {
        if ($rootScope.currentBusiness.id === $rootScope.business[x].id) {
          var businessToUpdate = $rootScope.business[x];
        }
      }
      businessToUpdate.customers.push(customer.id)

      businessService.update({id: $rootScope.currentBusiness.id}, businessToUpdate)
        .$promise
          .then(function(res) {
            $scope.sales = saleService.list();
            $scope.customerModal.hide();
            $state.go('tab.sale-list');
          }, function (error) {
            $rootScope.evaluateError(error)
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
      focusFirstInput: false
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
      focusFirstInput: false
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

    /*
     *
     * SALE
     *
     */

    /*TOGGLE CASH TO PERCENT*/
    $scope.cashPercentToggle = function () {
      $scope.cart.discount = 0
      $scope.cart.discountValue = 0
    }

    /*CHANGE VALUE DISCOUNT INPUT*/
    $scope.changeDiscount = function (toggleCashPercent, discount, cart) {
      if (toggleCashPercent) {
        cart.discount = discount
      } else {
        if(discount === cart.discountValue) {
          cart.discount = (cart.discountValue * 100) / cart.totalCart
          // $scope.cart = cart;
        }
      }
    }

    /*VALIDATE ORDER*/
    $scope.validateOrder = function (cart) {
      if (cart.discount < 0 || cart.discount > 100) {
        formCreateSale.$valid = false
        return false
      }
      else {
        formCreateSale.$valid = true
        return true
      }
    }

    /* CREATE SALE */
    $scope.create = function (cart) {
      $scope.showLoading()
      // Parser products
      var products = cart.products.map(function (product) {
        var obj = {id: product.item.id, qty: product.qty}
        return obj
      })
      // Parser services
      var services = cart.services.map(function (service) {
        var obj = {id: service.item.id, qty: service.item.qtySelected}
        return obj
      })
      // Construct order post
      var order = {
        order: {
          payment_method : "cash",
          customer: $rootScope.currentCustomer,
          business: $rootScope.currentBusiness.id,
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
            saleService.list()
              .$promise
                .then(function (res) {
                  $rootScope.sales = res
                  $rootScope.listSales = res
                }, function (error) {
                  $rootScope.evaluateError(error)
                })
            $scope.hideLoading()
            $state.go('tab.sale-list');
          }, function (error) {
            $rootScope.evaluateError(error)
            $scope.hideLoading()
          })
    }

    $scope.cancel = function () {
      $state.go('tab.sale-list');
    }

    /* BUTTON ADD */
    $scope.addItem = function (product,service,codeQR) {
      if (product) {
        if (product.isChecked) {
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
        } else {
          if (filterCartByIndex(product,null) != undefined) {
            product.qtySelected = 0;
            $scope.cart.products.splice(filterCartByIndex(product,null),1);
          }
        }
      }
      if (service) {
        if (service.isChecked) {
          var selectActual = filterCartById(null,service)
          if (!selectActual) {
            service.qtySelected = 1;
            service.isChecked = true;
            $scope.cart.services.push({ item: service});
          } else service.qtySelected++;
          console.log($scope.cart.services);
        } else {
          if (filterCartByIndex(null,service) != undefined) {
            service.qtySelected = 0;
            $scope.cart.services.splice(filterCartByIndex(null,service),1);
          }
        }
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

    /* FILTER IF THERE ITEM QR IN ALL PRODUCTS  */
    function filterByQR (qr) {
      if (qr) {
        for (var i = 0; i < $scope.products.length; i++) {
          if ($scope.products[i].id == qr) {
            $scope.products[i].isChecked = true
            $scope.addItem($scope.products[i])
          }
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
              $rootScope.evaluateError(error)
            })
      }
    }

    $scope.refresh = function (customers,products,services) {
      if (customers) {
        customerService.list()
          .$promise
            .then(function (res) {
              $scope.customers = res
              $scope.$broadcast('scroll.refreshComplete');
            },function (error) {
              $rootScope.evaluateError(error)
            })
      } else if (products) {
        productService.list()
          .$promise
            .then(function (res) {
              $scope.products = res
              for (var i = $scope.products.length - 1; i >= 0; i--) {
                $scope.products[i].qtySelected = 0
                $scope.products[i].isChecked = false
              }
              $scope.$broadcast('scroll.refreshComplete');
            }, function (error) {
              $rootScope.evaluateError(error)
            })
      } else if (services) {
        serviceService.list()
          .$promise
            .then(function (res) {
              $scope.services = res
              for (var i = $scope.services.length - 1; i >= 0; i--) {
                $scope.services[i].qtySelected = 0
                $scope.services[i].isChecked = false
              }
              $scope.$broadcast('scroll.refreshComplete');
            }, function (error) {
              $rootScope.evaluateError(error)
            })
      }
    }

    $scope.scan = function () {
      $cordovaBarcodeScanner.scan()
        .then( function (data) {
          filterByQR(data.text)
        }, function (err) {
          debugger
          alert("Scanning failed: " + err);
        });
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      saleService.list()
        .$promise
          .then(function (res) {
            $rootScope.sales = res
            $rootScope.listSales = res
          }, function (error) {
            $rootScope.evaluateError(error)
          })
    })

  }
])