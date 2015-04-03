redmineApp.controller('ProjectShowController', function ($scope, $rootScope, $routeParams, ProjectService) {
	ProjectService.get($routeParams.project_id).then(function (project) {
		$rootScope.project = project;
	});
});