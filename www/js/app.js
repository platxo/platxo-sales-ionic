// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var sales = angular.module('sales', [
  'ionic',
  'ngCordova',
  'authControllers',
  'authServices',
  'authRoutes',
  'saleControllers',
  'saleRoutes',
  'saleServices',
  'productControllers',
  'productServices',
  'serviceControllers',
  'serviceServices',
  'businessControllers',
  'businessRoutes',
  'businessServices',
  'salesDirectives'
])
sales.run(function($ionicPlatform, $rootScope, $state, $ionicHistory, $http) {
  $rootScope.version = 'http://development.';
  $rootScope.baseUrl = 'platxo-bi.appspot.com';
  $http.defaults.headers.common['Authorization'] = 'JWT ' + JSON.parse(localStorage.getItem("token"));
  $rootScope.currentUser = JSON.parse(localStorage.getItem("user")) || '';
  $rootScope.currentEmployee = $rootScope.currentUser.employee || '';
  $rootScope.currentBusiness = JSON.parse(localStorage.getItem("currentBusiness")) || '';
  $ionicPlatform.ready(function() {

    $rootScope.logout = function(forced) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('allBusiness');
      localStorage.removeItem('currentBusiness');
      localStorage.removeItem('maxPercentPoints');
      $http.defaults.headers.common['Authorization'] = undefined;
      $ionicHistory.clearCache().then(function() {
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $state.go('login');
      })
    };

    $rootScope.evaluateError = function (error) {
      debugger
      // Options default error
      var options = {
        title: 'Error Connection!',
        template: 'Try your connection',
        doneAlert: function () {

        }
      }
      if (error.data.detail === "Signature has expired.") {
        debugger
        var options = {
          title: 'Expired Session!',
          template: 'Login Please',
          doneAlert: function () {
            $rootScope.logout()
          }
        }
      }
      if (error.data.non_field_errors[0] === "Unable to login with provided credentials.") {
        var options = {
          title: 'Credentials invalid!',
          template: 'Login again Please',
          doneAlert: function () {
            $state.go('login');
          }
        }
      }

      $rootScope.showAlert(options)

    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
