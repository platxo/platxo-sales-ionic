var productServices = angular.module('productServices', ['ngResource']);

var productsUrl = '/api/products/';
var categoriesUrl = '/api/product-categories/';
var typesUrl = '/api/product-types/';

productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + productsUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT}
  });
}]);

productServices.service('productCategoriesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var headers = { 'Authorization': 'JWT ' + $rootScope.token}
  return $resource($rootScope.version + $rootScope.baseUrl + categoriesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);

productServices.service('productTypesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + typesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);