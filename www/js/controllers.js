var salesControllers = angular.module('salesControllers', []);

salesControllers.controller('saleController', [
  '$scope',
  '$stateParams',
  '$state',
  'saleService',
  'productService',
  'serviceService',
  function(
    $scope,
    $stateParams,
    $state,
    saleService,
    productService,
    serviceService
  )
  {
	  $scope.sales = saleService.list();
	  $scope.sale = saleService.detail({id: $stateParams.id});
	  $scope.products = productService.list();
	  $scope.services = serviceService.list();

	  $scope.create = function () {
	    saleService.create($scope.sale);
	    $scope.sales = saleService.list();
	    $state.go('tab.sale-list');
	  }

	  $scope.update = function () {
	    saleService.update($scope.sale);
	    $scope.sales = saleService.list();
	    $state.go('tab.sale-list');
	  }

	  $scope.delete = function () {
	    saleService.delete($scope.sale);
	    $scope.sales = saleService.list();
	    $state.go('tab.sale-list');
	  }

	  $scope.cancel = function () {
	    $state.go('tab.sale-list');
	  }

	  $scope.$on('$stateChangeSuccess', function() {
	    $scope.sales = saleService.list();
	  })

	}
]);