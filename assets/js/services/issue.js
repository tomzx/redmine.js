redmineApp.service('IssueService', function ($http, $q, ConfigurationService, Restangular) {
	var issuesUrl = ConfigurationService.getRestServiceBase() + "/issues";
	var issueStatuses;

	this.find = function (config) {
		return $http.get(issuesUrl + ".json", config).then(function (response) {
			return response.data;
		});
	};

	this.getIssueStatuses = function () {
		var deferred = $q.defer();

		if (issueStatuses !== undefined) {

			deferred.resolve(issueStatuses);

		} else {

			$http.get(ConfigurationService.getRestServiceBase() + "/issue_statuses.json").then(function (response) {
				issueStatuses = response.data.issue_statuses;
				deferred.resolve(issueStatuses);
			});
		}

		return deferred.promise;
	};

	this.getPriorities = function () {
		// TODO: Newer versions of redmine have a method to get the priority enumeration. If we are able to detect the
		// version we should use that method and use the hardcoded priorities as fallback.

		var deferred = $q.defer();
		deferred.resolve([
			{ "id": 3, "name": "Low" },
			{ "id": 4, "name": "Normal" },
			{ "id": 5, "name": "High" },
			{ "id": 6, "name": "Urgent" },
			{ "id": 7, "name": "Immediate" }
		]);

		return deferred.promise;
	};

	this.getCategoriesByProject = function (projectId) {
		return $http.get(ConfigurationService.getRestServiceBase() + '/projects/' + projectId + '/issue_categories.json').then(function (response) {
			return response.data.issue_categories;
		});
	};

	this.get = function (id, include) {
		return Restangular.one('issues', id).get({include: include});
	};


	this.delete = function (id, submission) {
		return $http.delete(issuesUrl + "/" + id + ".json", submission).then(function (response) {
		});
	};

	this.create = function (submission) {
		return $http.post(issuesUrl + ".json", submission).then(function (response) {
			return response.data.issue;
		});
	};
});