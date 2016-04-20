myApp.controller('LoginCtrl', function($scope, AuthService, $window, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside');
    }, function(errMsg) {
      var alertPopup = $window.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})


myApp.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };


$scope.getInfo = function(){
  $http.get(API_ENDPOINT.url + "api/search/info").then(function(result){
    $scope.infodata = result.data.msg;
  });
};


  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})

myApp.controller('AppCtrl', function($scope, $state, $window, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $window.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
});
