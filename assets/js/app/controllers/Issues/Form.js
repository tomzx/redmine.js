redmineApp.controller('IssueFormController', function($scope, ProjectService, IssueService, TrackerService, UserService) {
	$scope.submitting = false;

	ProjectService.getAllProjects().then(function (projects) {
		$scope.projects = projects;
	});

	IssueService.getIssueStatuses().then(function (statuses) {
		$scope.statuses = statuses;
	});

	IssueService.getPriorities().then(function (priorities) {
		$scope.priorities = priorities;
	});

	TrackerService.getTrackers().then(function (trackers) {
		$scope.trackers = trackers;
	});

	UserService.getAllUsers().then(function (users) {
		$scope.users = users;
	});

	$scope.setAssignedTo = function (user) {
		$scope.issue.assigned_to = user;
	};

	$scope.setStatus = function (status) {
		$scope.issue.status = status;
	};

	$scope.setCategory = function (category) {
		$scope.issue.category = category;
	};

	$scope.setProject = function (project) {
		$scope.issue.project = project;
	};

	$scope.setVersion = function (version) {
		$scope.issue.fixed_version = version;
	};

	$scope.setTracker = function (tracker) {
		$scope.issue.tracker = tracker;
	};

	$scope.setPriority = function (priority) {
		$scope.issue.priority = priority;
	};

	$scope.$watch("issue.project", function () {
		if (angular.isDefined($scope.issue) && angular.isDefined($scope.project)) {

			/* Reset category if not initial assignment */
			if (angular.isDefined($scope.categories)) {
				delete $scope.issue.category;
			}

			/* Reset version if not initial assignment */
			if (angular.isDefined($scope.versions)) {
				delete $scope.issue.fixed_version;
			}

			IssueService.getCategoriesByProject($scope.project.identifier).then(function (categories) {
				$scope.categories = categories;
			});

			ProjectService.getVersions($scope.project.identifier).then(function (versions) {
				$scope.versions = versions;
			});
		}
	});

	$scope.buildSubmission = function (existingIssue) {
		var issue = {};

		if (angular.isDefined($scope.issue.project) && angular.isDefined($scope.issue.project.id)) {
			issue.project_id = $scope.issue.project.id;
		}

		if (angular.isDefined($scope.issue.tracker) && angular.isDefined($scope.issue.tracker.id)) {
			issue.tracker_id = $scope.issue.tracker.id;
		}

		if (angular.isDefined($scope.issue.status) && angular.isDefined($scope.issue.status.id)) {
			issue.status_id = $scope.issue.status.id;
		}

		if (angular.isDefined($scope.issue.subject)) {
			if (!angular.isDefined(existingIssue) || $scope.issue.subject !== existingIssue.subject) {
				issue.subject = $scope.issue.subject;
			}
		}

		if (angular.isDefined($scope.issue.description)) {
			if (!angular.isDefined(existingIssue) || $scope.issue.description !== existingIssue.description) {
				issue.description = $scope.issue.description;
			}
		}

		if (angular.isDefined($scope.issue.assigned_to) && angular.isDefined($scope.issue.assigned_to.id)) {
			issue.assigned_to_id = $scope.issue.assigned_to.id;
		} else {
			issue.assigned_to_id = null;
		}

		if (angular.isDefined($scope.issue.parent_issue) && angular.isDefined($scope.issue.parent_issue.id)) {
			issue.parent_issue_id = $scope.issue.parent_issue.id;
		} else {
			issue.parent_issue_id = null;
		}

		if (angular.isDefined($scope.issue.category) && angular.isDefined($scope.issue.category.id)) {
			issue.category_id = $scope.issue.category.id;
		} else {
			issue.category_id = null;
		}

		if (angular.isDefined($scope.issue.fixed_version) && angular.isDefined($scope.issue.fixed_version.id)) {
			issue.fixed_version_id = $scope.issue.fixed_version.id;
		} else {
			issue.fixed_version_id = null;
		}

		if (angular.isDefined($scope.issue.tracker) && angular.isDefined($scope.issue.tracker.id)) {
			if (!angular.isDefined(existingIssue) || $scope.issue.tracker.id !== existingIssue.tracker_id) {
				issue.tracker_id = $scope.issue.tracker.id;
			}
		}

		if (angular.isDefined($scope.issue.priority) && angular.isDefined($scope.issue.priority.id)) {
			if (!angular.isDefined(existingIssue) || $scope.issue.priority.id !== existingIssue.priority_id) {
				issue.priority_id = $scope.issue.priority.id;
			}
		}

		return issue;
	};
});