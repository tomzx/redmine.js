redmineApp.controller('IssueEditController', function($controller, $injector, $scope, ProjectService, TrackerService, IssueService, UserService, Restangular, $routeParams, $location, $rootScope) {
	$controller('IssueFormController', {
		$scope: $scope,
		ProjectService: ProjectService,
		IssueService: IssueService,
		TrackerService: TrackerService,
		UserService: UserService
	});

	var originalIssue;

	IssueService.get($routeParams.id).then(function (issue) {
		originalIssue = Restangular.copy(issue);
		$scope.issue = issue;
		$rootScope.project = $scope.issue.project;
	});

	$scope.submit = function () {
		$scope.submitting = true;
		$scope.clearErrors();

		var submission = $scope.buildSubmission(originalIssue);
		Restangular.one('issues', $scope.issue.id).customPUT(submission).then(
			function (response) {
				$scope.submitting = false;
				$location.path("projects/" + $scope.issue.project.id);
			},
			function (response) {
				$scope.submitting = false;
				$scope.addError(response.data.errors);
			}
		);
	};
});