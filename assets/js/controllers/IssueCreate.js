redmineApp.controller('IssueCreateController', function($controller, $injector, $scope, ProjectService, IssueService, TrackerService, UserService, Restangular, $routeParams, $location, $rootScope) {
	$controller('IssueFormController', {
		$scope: $scope,
		ProjectService: ProjectService,
		IssueService: IssueService,
		TrackerService: TrackerService,
		UserService: UserService
	});

	$scope.issue = {};

	/* Assign default value after trackers are loaded */
	$scope.$watch("trackers", function () {
		if (angular.isDefined($scope.trackers) && $scope.trackers.length > 0) {
			$scope.issue.tracker = $scope.trackers[0];
		}
	});

	/* Assign default value after priorities are loaded */
	$scope.$watch("priorities", function () {
		if (angular.isDefined($scope.priorities) && $scope.priorities.length > 0) {
			/* Search for Normal priority */
			for (var i = 0; i < $scope.priorities.length; i++) {
				var priority = $scope.priorities[i];
				if ("Normal" == priority.name) {
					$scope.issue.priority = priority;
				}
			}
			/* Use first available if normal not found */
			if (angular.isUndefined($scope.issue.priority)) {
				$scope.issue.priority = $scope.priorities[0];
			}
		}
	});

	/* Assign default value after issue statuses are loaded */
	$scope.$watch("statuses", function () {
		if (angular.isDefined($scope.statuses) && $scope.statuses.length > 0) {
			$scope.issue.status = $scope.statuses[0];
		}
	});

	/* Preselect project whose id was passed by url */
	if (angular.isDefined($routeParams.project_id)) {
		ProjectService.get($routeParams.project_id).then(function (project) {
			$rootScope.project = project;
			$scope.issue.project = project;
		});
	}

	$scope.submit = function () {
		$scope.submitting = true;
		delete $scope.clearErrors;
		var submission = $scope.buildSubmission();
		Restangular.all('issues').post(submission).then(
			function () {
				$scope.submitting = false;
				$location.path("projects/" + $scope.issue.project.id);
			},
			function (response) {
				console.error(response);
				$scope.addError(response);
				$scope.submitting = false;
			}
		);
	};

	// $injector.invoke(IssueFormController, this, {
	// 	$scope: $scope,
	// 	ProjectService: ProjectService,
	// 	IssueService: IssueService,
	// 	TrackerService: TrackerService,
	// 	UserService: UserService
	// });
});