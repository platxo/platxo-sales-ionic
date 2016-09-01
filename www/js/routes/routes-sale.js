var saleRoutes = angular.module('saleRoutes', []);

saleRoutes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Sales
    .state('tab.sale-list', {
      url: '/sale-list',
      views: {
        'tab-sales': {
          templateUrl: 'templates/sale/sale-list.html',
          controller: 'saleController'
        }
      }
    })
    .state('tab.sale-detail', {
      url: '/sale-detail/:id',
      views: {
        'tab-sales': {
          templateUrl: 'templates/sale/sale-detail.html',
          controller: 'saleController'
        }
      }
    })
    .state('tab.sale-create', {
      url: '/sale-create',
      views: {
        'tab-sales': {
          templateUrl: 'templates/sale/sale-create.html',
          controller: 'saleController'
        }
      }
    })
    .state('tab.sale-update', {
      url: '/sale-update/:id',
      views: {
        'tab-sales': {
          templateUrl: 'templates/sale/sale-update.html',
          controller: 'saleController'
        }
      }
    })
    .state('tab.sale-delete', {
      url: '/sale-delete/:id',
      views: {
        'tab-sales': {
          templateUrl: 'templates/sale/sale-delete.html',
          controller: 'saleController'
        }
      }
    })
    .state('tab.product-list', {
      url: '/product-list',
      views: {
        'tab-products': {
          templateUrl: 'templates/product/product-list.html',
          controller: 'productController'
        }
      }
    })
    .state('tab.product-detail', {
      url: '/product-detail/:id',
      views: {
        'tab-products': {
          templateUrl: 'templates/product/product-detail.html',
          controller: 'productController'
        }
      }
    })

}]);
