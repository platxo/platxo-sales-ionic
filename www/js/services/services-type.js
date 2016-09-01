var typeServices = angular.module('typeServices', ['ngResource']);

var version = 'http://development.'
var baseUrl = 'platxo-bi.appspot.com';
var typesUrl = '/api/product-types/';

typeServices.service('typeService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource(version + baseUrl + typesUrl +':id/?format=json', {id: '@id'},{
    list: { method: 'GET', isArray:true, headers: $rootScope.headersJWT },
  });
}]);
