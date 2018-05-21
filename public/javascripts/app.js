angular.module('app', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceProvider', function($routeProvider, $locationProvider, $httpProvider, $sceProvider) {
	$sceProvider.enabled(false);

	$routeProvider
	.when('/', {
		templateUrl: 'templates/login/login.html',
		controller: 'loginController',
		controllerAs: 'vm'
	})

	

	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
  		enabled: false,
  		requireBase: false
	});

	$httpProvider.interceptors.push('timestampInterceptor');


}])