var authServices = angular.module('authServices', ['ngResource']);

var signupUrl = '/api/users/';
var loginUrl = '/api-token-auth/';

authServices.service('signupService', [ '$resource', '$rootScope', function ($resource,$rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + signupUrl +':id/?format=json', {id: '@id'},{
    create: { method: 'POST' },
    update: { method: 'PUT' }
  })
}])

authServices.service('loginService', [ '$resource', '$rootScope', function ($resource,$rootScope) {
  return $resource($rootScope.version + $rootScope.baseUrl + loginUrl +'?format=json', {},{
    create: { method: 'POST' }
  })
}])

authServices.service('forgotPasswordService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var forgotPasswordUrl = '/api/forgot-password/';
  return $resource($rootScope.version + $rootScope.baseUrl + forgotPasswordUrl +'?format=json', {},{
    send: { method: 'POST', headers: { 'Authorization': undefined }}
  });
}]);

authServices.service('validateService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var validateUrl = '/api/forgot-password-validate/';
  return $resource($rootScope.version + $rootScope.baseUrl + validateUrl +'?format=json', {},{
    send: { method: 'POST', headers: { 'Authorization': undefined }}
  });
}]);

authServices.service('resetPasswordService', [ '$resource', '$rootScope', function ($resource, $rootScope) {
  var resetPasswordUrl = '/api/reset-password/';
  return $resource($rootScope.version + $rootScope.baseUrl + resetPasswordUrl +'?format=json', {},{
    send: { method: 'POST', headers: { 'Authorization': undefined }}
  });
}]);