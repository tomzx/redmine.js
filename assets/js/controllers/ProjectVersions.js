redmineApp.controller('ProjectVersionsController', function($scope, $rootScope, $routeParams, ProjectService) {
	ProjectService.get($routeParams.id).then(function (project) {
		$rootScope.project = project;
	});

	ProjectService.getVersions($routeParams.id).then(function (versions) {
		$scope.versions = versions;
	});
});