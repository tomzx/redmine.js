redmineApp.controller('ProjectShowController', function ($scope, $rootScope, $routeParams, ProjectService) {
	ProjectService.get($routeParams.id).then(function (project) {
		$rootScope.project = project;
	});
});