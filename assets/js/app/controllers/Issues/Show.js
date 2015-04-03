redmineApp.controller('IssueShowController', function($scope, $rootScope, $window, $routeParams, $location, ProjectService, IssueService, TrackerService, UserService, Restangular) {
	$scope.issue = {};

	IssueService.get($routeParams.id, 'attachments,changesets,children,journals,relations,watchers').then(function (issue) {
		originalIssue = Restangular.copy(issue);
		$scope.issue = issue;
		$rootScope.project = $scope.issue.project;
	});

	$scope.deleteIssue = function (issue) {
		if ($window.confirm('Are you sure you wish to delete the issue?')) {
			IssueService.delete(issue.id).then(function () {
				$location.path('/projects/' + issue.project.id);
			});
		}
	};
});