redmineApp.controller('LogoutController', function($scope, $location, $window) {
	$.cookie('loggedIn', false);
	$location.path('/login');
	$window.location.reload();
});