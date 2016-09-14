var serviceServices = angular.module('serviceServices', ['ngResource']);

var servicesUrl = '/api/services/';
var categoriesServiceUrl = '/api/service-categories/';
var typesServiceUrl = '/api/service-types/';

serviceServices.service('serviceService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + servicesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT }
  });
}]);

serviceServices.service('serviceCategoriesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + categoriesServiceUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT }
  });
}]);

serviceServices.service('serviceTypesService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + typesServiceUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT }
  });
}]);
