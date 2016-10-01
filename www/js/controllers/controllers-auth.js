var authControllers = angular.module('authControllers', []);

authControllers.controller('signupController', [
  '$scope',
  '$stateParams',
  'signupService',
  '$location',
  function(
    $scope,
    $stateParams,
    signupService,
    $location
  )
  {
    $scope.user = {}

    $scope.create = function () {
      signupService.create($scope.user)
        .$promise
          .then(function (response) {
            $scope.user = {};
            $location.path('/login');
          }, function (reason) {
            $scope.user = {};
            $scope.errors = reason;
          })
    }

  }
]);

authControllers.controller('loginController', [
  '$scope',
  'loginService',
  '$rootScope',
  '$location',
  '$state',
  function(
    $scope,
    loginService,
    $rootScope,
    $location,
    $state
  ) {
    if (localStorage.token) $state.go('tab.sale-list');
    $scope.user = {}

    $scope.create = function () {
      loginService.create($scope.user)
        .$promise
          .then(function (response) {
            $scope.user = {};
            $rootScope.token = response.token;
            localStorage.setItem("token", JSON.stringify($rootScope.token));
            localStorage.setItem('user', JSON.stringify(response.user));
            $rootScope.currentUser = response.user;
            $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token}
            $location.path('/business-list');
          }, function (reason) {
            $scope.user = {};
            $scope.errors = reason;
          })
    }

}]);
