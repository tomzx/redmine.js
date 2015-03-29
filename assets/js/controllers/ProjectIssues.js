redmineApp.controller('ProjectIssuesController', function($scope, $rootScope, $window, $routeParams, $location, ProjectService, IssueService, TrackerService) {
	ProjectService.get($routeParams.id).then(function (project) {
		$rootScope.project = project;
	});

	$scope.loadIssues = function () {
		delete $scope.issues;

		var config = {
			params: {
				project_id: $routeParams.id
			}
		};

		IssueService.find(config)
			.then(function (data) {
				$scope.issues = {
					'entries': data.issues,
					'pagination': {
						'offset': data.offset,
						'total': data.total_count,
						'limit': data.limit
					}
				};
			});
	};

	$scope.deleteIssue = function (issue) {
		if ($window.confirm('Are you sure you wish to delete the issue?')) {
			IssueService.delete(issue.id).then(function () {
				$scope.loadIssues();
			});
		}
	};

	$scope.deleteProject = function (id) {
		if ($window.confirm('Are you sure you wish to delete the project?')) {
			ProjectService['delete'](id).then(function () {
				$location.path("/project");
			});
		}
	};

	$scope.getTrackerMapping = function (tracker) {
		return TrackerService.getTrackerMapping(tracker);
	};

	$scope.loadIssues();
});