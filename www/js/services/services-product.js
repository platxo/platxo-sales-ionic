var productServices = angular.module('productServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var productsUrl = '/api/products/';
var categoriesUrl = '/api/product-categories/';
var typesUrl = '/api/product-types/';

productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + productsUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT}
  });
}]);

productServices.service('productCategoriesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var headers = { 'Authorization': 'JWT ' + $rootScope.token}
  return $resource(version + baseUrl + categoriesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);

productServices.service('productTypesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + typesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);