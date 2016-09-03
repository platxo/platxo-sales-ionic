var serviceServices = angular.module('serviceServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var servicesUrl = '/api/services/';
var categoriesServiceUrl = '/api/service-categories/';
var typesServiceUrl = '/api/service-types/';

serviceServices.service('serviceService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + servicesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT }
  });
}]);

serviceServices.service('serviceCategoriesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + categoriesServiceUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT }
  });
}]);

serviceServices.service('serviceTypesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + typesServiceUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT }
  });
}]);
