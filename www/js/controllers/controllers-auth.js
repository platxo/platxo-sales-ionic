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
    if (localStorage.token) $state.go('tab.sale-list');
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
      $scope.showLoading()
      loginService.create($scope.user)
        .$promise
          .then(function (response) {
            $rootScope.goToLogin = false;
            $scope.user = {};
            $rootScope.token = response.token;
            $rootScope.currentUser = response.user;
            localStorage.setItem("token", JSON.stringify($rootScope.token));
            localStorage.setItem('user', JSON.stringify($rootScope.currentUser));
            $http.defaults.headers.common['Authorization'] = 'JWT ' + $rootScope.token;
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
            $scope.hideLoading()
          }, function (reason) {
            $scope.user.password = "";
            $scope.hideLoading()
            $scope.errors = reason;
          })
    }

}]);

authControllers.controller('forgotPasswordController', [
  '$scope',
  '$state',
  'forgotPasswordService',
  'validateService',
  'resetPasswordService',
  function(
    $scope,
    $state,
    forgotPasswordService,
    validateService,
    resetPasswordService
  )
  {
    if (localStorage.token) $state.go('tab.product-list');
    $scope.step1 = true

    $scope.sendEmail = function (data) {
      $scope.email = data.email
      forgotPasswordService.send(data)
      .$promise
        .then (function (res) {
          $scope.step1 = false
          $scope.step2 = true
        }, function (err) {
          $scope.email = ''
        })
    }

    $scope.sendCode = function (data) {
      data.email = $scope.email;
      validateService.send(data)
      .$promise
        .then (function (res) {
          $scope.forgotToken = res.token
          $scope.step3 = true
          $scope.step2 = false
        }, function (err) {

        })
    }

    $scope.sendPassword = function (data) {
      data.token = $scope.forgotToken
      resetPasswordService.send(data)
      .$promise
        .then (function (res) {
          $state.go('login')
        }, function (err) {

        })
    }
	}
]);
