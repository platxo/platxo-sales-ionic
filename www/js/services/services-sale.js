var saleServices = angular.module('saleServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var salesUrl = '/api/sales/';

saleServices.service('saleService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + salesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);
