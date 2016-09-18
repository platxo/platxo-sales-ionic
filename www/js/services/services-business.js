var businessServices = angular.module('businessServices', ['ngResource']);

var businessUrl = '/api/business/';

businessServices.service('businessService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + businessUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
  });
}]);
