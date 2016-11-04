var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessListCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'businessService',
  function(
    $scope,
    $rootScope,
    $state,
    businessService
  )
  {
    $scope.showLoading()
    businessService.list()
      .$promise
        .then(function(res) {
          $rootScope.business = res;
          $scope.hideLoading()
        }, function (error) {
          if (error.data.detail === "Signature has expired.") {
            debugger
            $scope.showAlertExpired()
          }
          $scope.hideLoading()
        })

	  $scope.update = function () {
	    businessService.update($scope.bs)
        .$promise
          .then(function (res) {
      	    $scope.business = businessService.list();
      	    $state.go('business-list');
          }, function (error) {
            $rootScope.evaluateError(error)
          })
	  }

	  $scope.cancel = function () {
	    $state.go('business-list');
	  }

    $scope.selectBs = function(bs) {
      $rootScope.maxPercentPoints = bs.crm_points
      localStorage.setItem("maxPercentPoints", JSON.stringify($rootScope.maxPercentPoints));
      $rootScope.currentBusiness = bs.id;
      localStorage.setItem("currentBusiness", JSON.stringify($rootScope.currentBusiness));
      $state.go('tab.sale-list');
    }

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'business-list') {
  	    businessService.list()
          .$promise
            .then(function(res) {
              $rootScope.business = res;
            }, function (error) {
              $rootScope.evaluateError(error)
            })
      }
	  })

	}
]);
