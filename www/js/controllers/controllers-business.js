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
    debugger
    if(!$rootScope.goToLogin) {
      businessService.list()
        .$promise
          .then(function(res) {
            if ($rootScope.businessUser) {
              if($rootScope.businessUser.length > 0) {
                $rootScope.business = res;
                for (var i = $rootScope.business.length - 1; i >= 0; i--) {
                  for (var j = $rootScope.businessUser.length - 1; j >= 0; j--) {
                    if (!($rootScope.business[i].id === $rootScope.businessUser[j].id) && !($rootScope.business[i].name === $rootScope.businessUser[j].name)) {
                      $rootScope.business.splice(i,1)
                    }
                  }
                }
              } else if ($rootScope.businessUser.length === 0) $rootScope.business = []
            }

            localStorage.setItem("allBusiness", JSON.stringify($rootScope.business));
          }, function (error) {
            if (error.data.detail === "Signature has expired.") {
              debugger
              if(!$rootScope.goToLogin) $scope.showAlertExpired()
            }
          })
    }

	  $scope.update = function () {
	    businessService.update($scope.bs)
        .$promise
          .then(function (res) {
      	    $scope.business = businessService.list();
      	    $state.go('business-list');
          }, function (error) {
            if (error.data.detail === "Signature has expired.") {
              debugger
              if(!$rootScope.goToLogin) {
                $scope.showAlertExpired()
              }
            }
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
      debugger
      if (toState.name === 'business-list') {
        if (!$rootScope.goToLogin) {
    	    businessService.list()
            .$promise
              .then(function(res) {
                if ($rootScope.businessUser) {
                  if($rootScope.businessUser.length > 0) {
                    $rootScope.business = res;
                    for (var i = $rootScope.business.length - 1; i >= 0; i--) {
                      for (var j = $rootScope.businessUser.length - 1; j >= 0; j--) {
                        if (!($rootScope.business[i].id === $rootScope.businessUser[j].id) && !($rootScope.business[i].name === $rootScope.businessUser[j].name)) {
                          $rootScope.business.splice(i,1)
                        }
                      }
                    }
                  } else if ($rootScope.businessUser.length === 0) $rootScope.business = []
                }

                localStorage.setItem("allBusiness", JSON.stringify($rootScope.business));
              }, function (error) {
                if (error.data.detail === "Signature has expired.") {
                  debugger
                  if(!$rootScope.goToLogin) {
                    $scope.showAlertExpired()
                  }
                }
              })
        }
      }
	  })

	}
]);