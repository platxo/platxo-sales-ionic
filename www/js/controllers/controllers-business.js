var businessControllers = angular.module('businessControllers', []);

businessControllers.controller('businessController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$state',
  '$location',
  '$ionicModal',
  'businessService',
  function(
    $scope,
    $rootScope,
    $stateParams,
    $state,
    $location,
    $ionicModal,
    businessService
  )
  {
    businessService.list()
      .$promise
        .then(function(res) {
          $rootScope.business = res;
          localStorage.setItem("allBusiness", JSON.stringify($rootScope.business));
        }, function () {
          debugger
        })
	  // $scope.bs = businessService.detail({id: $stateParams.id});

	  $scope.update = function () {
      debugger
	    businessService.update($scope.bs);
	    // $scope.business = businessService.list();
	    $state.go('business-list');
	  }

	  $scope.cancel = function () {
	    $state.go('business-list');
	  }


	  $scope.$on('$stateChangeSuccess', function() {
	    // $scope.business = businessService.list();
	  })

    $scope.selectBs = function(bs) {
      $rootScope.currentBusiness = bs.id;
      localStorage.setItem("currentBusiness", JSON.stringify($rootScope.currentBusiness));
      $state.go('tab.sale-list');
    }

    $scope.$on('$stateChangeSuccess', function() {
	    // $scope.business = businessService.list();
	  })

	}
]);