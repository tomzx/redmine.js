var redmineApp = angular.module('redmineApp', ['ngRoute', 'restangular'])
.config(function($httpProvider, $routeProvider, $locationProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController',
	});

	$routeProvider.when('/projects', {
		templateUrl: 'partials/projects/list.html',
		controller: 'ProjectListController',
	});

	$routeProvider.when('/projects/:id', {
		templateUrl: 'partials/issues/index.html',
		controller: 'ProjectIssuesController',
	});

	$routeProvider.when('/projects/:id/issues', {
		templateUrl: 'partials/issues/index.html',
		controller: 'ProjectIssuesController',
	});

	$routeProvider.when('/projects/:id/versions', {
		templateUrl: 'partials/projects/versions.html',
		controller: 'ProjectVersionsController',
	});

	$routeProvider.when('/issues/:id', {
		templateUrl: 'partials/issues/show.html',
		controller: 'IssueShowController',
	});

	$routeProvider.when('/issues/:id/edit', {
		templateUrl: 'partials/issues/edit.html',
		controller: 'IssueEditController',
	});

	$routeProvider.when('/issues/create', {
		templateUrl: 'partials/issues/create.html',
		controller: 'IssueCreateController',
	});

	$routeProvider.when('/users/issues', {
		templateUrl: 'partials/users/issues.html',
		controller: 'UserIssuesController',
	});

	$routeProvider.otherwise({
		redirectTo: 'projects'
	});

	$locationProvider.hashPrefix('!');
})
.run(function($rootScope, $location, Restangular) {
	$rootScope.requestedPath = $location.path();
	$location.path("/login");

	setupErrorManagement($rootScope);
	setupRestangular(Restangular);
});

function setupErrorManagement($rootScope) {
	$rootScope.errors = [];

	$rootScope.clearErrors = function (error) {
		$rootScope.errors = [];
	};

	$rootScope.addError = function (error) {
		if (angular.isDefined(error.statusText)) {
			$rootScope.errors.push(error.statusText);
			return;
		}

		$rootScope.errors.push(error);
	};

	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		$rootScope.clearErrors();
		$('.navbar-collapse').collapse('hide');
	});
}

function setupRestangular(Restangular) {
	Restangular.setRequestSuffix('.json');

	/* Redmine does wrap the responses, so we need to extract them in oder to "restangularize" */
	Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
		switch (what) {
			case "issues":
				if (operation === "get") {
					return data.issue;
				}
				break;

			case "trackers":
				if (operation === "getList") {
					return data.trackers;
				}
				break;
		}

		console.debug("Unmodified Response", data, operation, what, url, response, deferred);
		return data;
	});

	/* Redmine needs wrapped requests, so wrap them */
	Restangular.addRequestInterceptor(function (element, operation, what, url) {
		switch (what) {
			case "issues":
				switch (operation) {
					case "put":
					case "post":
						return {
							'issue': element
						};
				}
				break;
		}

		console.debug("Unmodified Request", element, operation, what, url);
		return element;
	});
}