var categoryServices = angular.module('categoryServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var categoriesUrl = '/api/product-categories/';

categoryServices.service('categoryService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
	var headers = { 'Authorization': 'JWT ' + $rootScope.token}
  return $resource(version + baseUrl + categoriesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);
