var productServices = angular.module('productServices', ['ngResource']);

var productsUrl = '/api/products/';

productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + productsUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT}
  });
}]);
