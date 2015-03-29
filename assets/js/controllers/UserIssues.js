redmineApp.controller('UserIssuesController', function($scope, IssueService) {
	$scope.loadIssues = function () {
		delete $scope.issues;

		var config = {
			params: {
				assigned_to: $scope.user.id
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

	$scope.loadIssues();
});