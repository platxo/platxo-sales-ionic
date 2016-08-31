var serviceServices = angular.module('serviceServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var servicesUrl = '/api/services/';

serviceServices.service('serviceService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + servicesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
    detail: { method: 'GET', headers: $rootScope.headersJWT }
  });
}]);
