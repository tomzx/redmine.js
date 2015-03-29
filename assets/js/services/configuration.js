redmineApp.service('ConfigurationService', function ($http, Restangular) {
	var _restServiceBase;
	var _apiKey;

	this.getRestServiceBase = function () {
		return _restServiceBase;
	};

	this.setRestServiceBase = function (url) {
		_restServiceBase = url;
		Restangular.setBaseUrl(url);
	};

	this.getApiKey = function () {
		return _apiKey;
	};

	this.setApiKey = function (apiKey) {
		_apiKey = apiKey;
		$http.defaults.headers.common['X-Redmine-API-Key'] = apiKey;
		Restangular.setDefaultHeaders({
			'X-Redmine-API-Key': apiKey
		});
	};
});