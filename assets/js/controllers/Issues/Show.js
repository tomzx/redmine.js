redmineApp.controller('IssueShowController', function($scope, ProjectService, IssueService, TrackerService, UserService, Restangular, $routeParams, $location, $rootScope) {
	$scope.issue = {};

	IssueService.get($routeParams.id, 'attachments,changesets,children,journals,relations,watchers').then(function (issue) {
		originalIssue = Restangular.copy(issue);
		$scope.issue = issue;
		$rootScope.project = $scope.issue.project;
	});
});