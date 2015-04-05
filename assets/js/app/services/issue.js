redmineApp.service('IssueService', function ($http, $q, ConfigurationService, Restangular) {
	var issuesUrl = ConfigurationService.getRestServiceBase() + '/issues';
	var issueStatuses;

	this.find = function (config) {
		return $http.get(issuesUrl + '.json', config).then(function (response) {
			return response.data;
		});
	};

	this.getIssueStatuses = function () {
		return Restangular.all('issue_statuses').getList();
	};

	this.getPriorities = function () {
		return Restangular.all('enumerations/issue_priorities').getList();
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
		return $http.delete(issuesUrl + '/' + id + '.json', submission).then(function (response) {
		});
	};

	this.create = function (projectId, submission) {
		return Restangular.all('projects/' + projectId + '/issues').post(submission);
	};
});