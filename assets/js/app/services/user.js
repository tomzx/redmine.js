redmineApp.service('UserService', function ($http, $q, ConfigurationService) {
	var allUsersPromise;

	this.getCurrent = function () {
		return $http.get(ConfigurationService.getRestServiceBase() + "/users/current.json");
	};

	this.getAllUsers = function () {

		if (angular.isDefined(allUsersPromise)) {
			return allUsersPromise;
		}

		allUsersPromise = $http.get(ConfigurationService.getRestServiceBase() + "/users.json?limit=1000").then(function (response) {
			return response.data.users;
		});

		return allUsersPromise;
	};
});