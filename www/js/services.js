var salesServices = angular.module('salesServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var salesUrl = '/api/sales/';
var productsUrl = '/api/products/';
var servicesUrl = '/api/services/';

salesServices.service('saleService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + salesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}]);

salesServices.service('productService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + productsUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' }
  });
}]);

salesServices.service('serviceService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + servicesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' }
  });
}]);
