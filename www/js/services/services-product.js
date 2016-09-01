var productServices = angular.module('productServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var productsUrl = '/api/products/';
var categoriesUrl = '/api/product-categories/';
var typesUrl = '/api/product-types/';

productServices.service('productService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + productsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
    detail: { method: 'GET', headers: $rootScope.headersJWT }
  });
}]);

productServices.service('categoryService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var headers = { 'Authorization': 'JWT ' + $rootScope.token}
  return $resource(version + baseUrl + categoriesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);

productServices.service('typeService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + typesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);