var saleServices = angular.module('saleServices', ['ngResource']);

var salesUrl = '/api/sales/';
var customerUrl = '/api/customers/';
var businessUrl = '/api/business/';

saleServices.service('saleService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + salesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);

saleServices.service('customerService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + customerUrl +'?format=json', {},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' }
  });
}]);

saleServices.service('businessService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + businessUrl +':id/?format=json', {id: '@id'},{
    update: { method: 'PUT' }
  });
}]);