var serviceServices = angular.module('serviceServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var servicesUrl = '/api/services/';

serviceServices.service('serviceService', [ '$resource', function ($resource) {
  return $resource(version + baseUrl + servicesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true },
    detail: { method: 'GET' }
  });
}]);
