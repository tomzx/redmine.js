redmineApp.controller('IssueEditController', function($controller, $injector, $scope, $routeParams, $location, ProjectService, TrackerService, IssueService, UserService, Restangular) {
	$controller('IssueFormController', {
		$scope: $scope,
		ProjectService: ProjectService,
		IssueService: IssueService,
		TrackerService: TrackerService,
		UserService: UserService
	});

	var originalIssue;

	ProjectService.get($routeParams.project_id).then(function (project) {
		$scope.project = project;
	});

	IssueService.get($routeParams.id).then(function (issue) {
		originalIssue = Restangular.copy(issue);
		$scope.issue = issue;
	});

	$scope.submit = function () {
		$scope.submitting = true;
		$scope.clearErrors();

		var submission = $scope.buildSubmission(originalIssue);
		Restangular.one('issues', $scope.issue.id).customPUT(submission).then(
			function (response) {
				$scope.submitting = false;
				$location.path("projects/" + $scope.project.identifier + '/issues/' + $scope.issue.id);
			},
			function (response) {
				$scope.submitting = false;
				$scope.addError(response.data.errors);
			}
		);
	};
});