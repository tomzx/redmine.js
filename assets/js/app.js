var redmineApp = angular.module('redmineApp', ['ngRoute', 'restangular'])
.config(function($httpProvider, $routeProvider, $locationProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController',
	});

	$routeProvider.when('/logout', {
		templateUrl: 'partials/logout.html',
		controller: 'LogoutController',
	});

	$routeProvider.when('/projects', {
		templateUrl: 'partials/projects/index.html',
		controller: 'ProjectIndexController',
	});

	$routeProvider.when('/projects/create', {
		templateUrl: 'partials/projects/create.html',
		controller: 'ProjectCreateController',
	});

	$routeProvider.when('/projects/:id', {
		templateUrl: 'partials/projects/show.html',
		controller: 'ProjectShowController',
	});

	$routeProvider.when('/projects/:id/activity', {
		templateUrl: 'partials/projects/activity.html',
		controller: 'ProjectActivityController',
	});

	$routeProvider.when('/projects/:id/roadmap', {
		templateUrl: 'partials/projects/roadmap.html',
		controller: 'ProjectRoadmapController',
	});

	$routeProvider.when('/projects/:id/issues', {
		templateUrl: 'partials/projects/issues.html',
		controller: 'ProjectIssuesController',
	});

	$routeProvider.when('/projects/:id/issues/create', {
		templateUrl: 'partials/issues/create.html',
		controller: 'IssueCreateController',
	});

	$routeProvider.when('/projects/:id/issues/:id', {
		templateUrl: 'partials/issues/show.html',
		controller: 'IssueShowController',
	});

	$routeProvider.when('/projects/:id/issues/:id/edit', {
		templateUrl: 'partials/issues/edit.html',
		controller: 'IssueEditController',
	});

	$routeProvider.when('/projects/:id/settings', {
		templateUrl: 'partials/projects/edit.html',
		controller: 'ProjectEditController',
	});

	$routeProvider.otherwise({
		redirectTo: 'projects'
	});

	$locationProvider.hashPrefix('!');
})
.run(function($rootScope, $location, Restangular) {
	$rootScope.requestedPath = $location.path();
	$location.path("/login");

	$.cookie.json = true;
	setupLocationHooks($rootScope, $location);
	setupErrorManagement($rootScope);
	setupRestangular(Restangular);
});

function setupLocationHooks($rootScope, $location) {
	$rootScope.$on('$locationChangeStart', function() {
		if ( ! $.cookie('loggedIn')) {
			$location.path('/login');
		}
	});
}

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