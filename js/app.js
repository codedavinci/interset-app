var myApp = angular.module('myApp', [require('angular-route')]);

myApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('outside.login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('inside', {
    url: '/inside',
    templateUrl: 'templates/inside.html',
    controller: 'InsideCtrl'
  });

  $urlRouterProvider.otherwise('/outside/login');
})

myApp.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login') {
        event.preventDefault();
        $state.go('outside.login');
      }
    }
  });
});
