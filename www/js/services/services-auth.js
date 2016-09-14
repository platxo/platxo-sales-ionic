var authServices = angular.module('authServices', ['ngResource']);

var signupUrl = '/api/users/';
var loginUrl = '/api-token-auth/';

authServices.service('signupService', [ '$resource', '$rootScope', function ($resource,$rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + signupUrl +'?format=json', {},{
    create: { method: 'POST' }
  })
}])

authServices.service('loginService', [ '$resource', '$rootScope', function ($resource,$rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + loginUrl +'?format=json', {},{
    create: { method: 'POST' }
  })
}])
