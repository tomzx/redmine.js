redmineApp.controller('ProjectActivityController', function($scope, $rootScope, $routeParams, ProjectService) {
	ProjectService.get($routeParams.project_id).then(function (project) {
		$rootScope.project = project;
	});
});