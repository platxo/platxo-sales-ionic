var saleServices = angular.module('saleServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var salesUrl = '/api/sales/';
var customerUrl = '/api/users/';

saleServices.service('saleService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + salesUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
    create: { method: 'POST', headers: $rootScope.headersJWT },
    update: { method: 'PUT', headers: $rootScope.headersJWT },
    delete: { method: 'DELETE', headers: $rootScope.headersJWT }
  });
}]);

saleServices.service('customerService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + customerUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true, headers:  $rootScope.headersJWT},
    detail: { method: 'GET', headers: $rootScope.headersJWT }
  });
}]);