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
  '$http',
  function(
    $scope,
    loginService,
    signupService,
    $rootScope,
    $location,
    $state,
    $http
  ) {
    if (localStorage.token) $state.go('tab.sale-list');
    $scope.user = {}

    $scope.create = function () {
      loginService.create($scope.user)
        .$promise
          .then(function (response) {
            $rootScope.goToLogin = false;
            $scope.user = {};
            $rootScope.token = response.token;
            localStorage.setItem("token", JSON.stringify($rootScope.token));
            localStorage.setItem('user', JSON.stringify($rootScope.currentUser));
            $http.defaults.headers.common['Authorization'] = 'JWT ' + $rootScope.token;
            $rootScope.currentUser = response.user;
            if (response.user.is_employee) {
              $rootScope.businessUser = response.user.employee.business
              $location.path('/business-list');
            }
            else if (!response.user.is_employee) {
              response.user.is_employee = true;
              signupService.update(response.user)
                .$promise
                  .then(function (response) {
                    debugger
                    $rootScope.businessUser = response.employee.business
                    $state.go('business-list');
                  }, function (error) {
                    if (error.data.detail === "Signature has expired.") {
                      debugger
                    }
                    $location.path('/login');
                  })
            }
          }, function (reason) {
            $scope.user.password = "";
            $scope.errors = reason;
          })
    }

}]);
