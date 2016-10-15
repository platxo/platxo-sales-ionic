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
  'signupService',
  '$rootScope',
  '$location',
  '$state',
  function(
    $scope,
    loginService,
    signupService,
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
            debugger
            if (response.user.is_employee) {
              $rootScope.businessUser = response.user.employee.business
            } else if (!response.user.is_employee) {
              response.user.is_employee = true;
              signupService.update(response.user)
            }
            $rootScope.currentUser = response.user;
            localStorage.setItem('user', JSON.stringify(response.user));
            $rootScope.headersJWT = {'Authorization': 'JWT ' + $rootScope.token}
            $location.path('/business-list');
          }, function (reason) {
            $scope.user = {};
            $scope.errors = reason;
          })
    }

}]);
