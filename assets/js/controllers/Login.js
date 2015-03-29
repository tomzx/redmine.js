redmineApp.controller('LoginController', function($scope, $rootScope, $location, UserService, ConfigurationService, ProjectService) {
	$scope.submitting = false;

	var login = function (baseUrl, apiKey) {
		delete $scope.error;
		$scope.submitting = true;

		ConfigurationService.setRestServiceBase(baseUrl);
		ConfigurationService.setApiKey(apiKey);

		UserService.getCurrent()
			.success(function (data) {

				$rootScope.user = data.user;

				ProjectService.getTopLevelProjects().then(
					function (projects) {

						$rootScope.topLevelProjects = projects;
						$scope.submitting = false;

						/* Redirect back to originally requested path if possible */
						if (angular.isDefined($rootScope.requestedPath) && $rootScope.requestedPath != "/login") {
							$location.path($rootScope.requestedPath);
						} else {
							$location.path("/");
						}

					}, function (response) {

						$scope.addError("Getting toplevel projects failed");
						console.error(response);
						$scope.submitting = false;
					}
				);
			})
			.error(function (data, status, headers, config) {
				$scope.addError("Login failed with status " + status);
				$scope.submitting = false;
			});
	};

	/* Try login based on cookie */
	$scope.baseUrl = $.cookie('baseUrl');
	$scope.apiKey = $.cookie('apiKey');
	if ($scope.baseUrl !== undefined && $scope.apiKey !== undefined) {
		login($scope.baseUrl, $scope.apiKey);
	}

	$scope.submit = function () {
		$.cookie('baseUrl', $scope.baseUrl, { expires: 365 });
		$.cookie('apiKey', $scope.apiKey, { expires: 365 });
		login($scope.baseUrl, $scope.apiKey);
	};
});