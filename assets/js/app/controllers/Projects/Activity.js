redmineApp.controller('ProjectActivityController', function($scope, $rootScope, $routeParams, ProjectService) {
	ProjectService.get($routeParams.id).then(function (project) {
		$rootScope.project = project;
	});
});