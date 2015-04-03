redmineApp.controller('ProjectRoadmapController', function($scope, $rootScope, $routeParams, ProjectService) {
	ProjectService.get($routeParams.project_id).then(function (project) {
		$rootScope.project = project;
	});

	ProjectService.getVersions($routeParams.project_id).then(function (versions) {
		$scope.versions = versions;
	});
});