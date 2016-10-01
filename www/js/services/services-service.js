var serviceServices = angular.module('serviceServices', ['ngResource']);

var servicesUrl = '/api/services/';

serviceServices.service('serviceService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + servicesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT }
  });
}]);
