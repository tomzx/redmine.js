redmineApp.service('ProjectService', function ($http, $q, ConfigurationService) {
	var projectService = this;

	var projectMap;
	var topLevelProjects;
	var allProjects;
	var loadPromise;

	var trackersPromise;

	this.loadProjects = function () {
		if (loadPromise !== undefined) {
			return loadPromise;
		}

		var deferredLoad = $q.defer();

		if (topLevelProjects !== undefined) {
			deferredLoad.resolve(topLevelProjects);
		} else {
			$http.get(ConfigurationService.getRestServiceBase() + "/projects.json?limit=1000").then(function (response) {
				projectMap = {};
				topLevelProjects = [];
				allProjects = response.data.projects;

				/* First pass, hash projects */
				for (var i = 0; i < response.data.projects.length; i++) {
					projectMap[response.data.projects[i].id] = response.data.projects[i];
				}

				/* Second pass, assign subprojects */
				for (var j = 0; j < response.data.projects.length; j++) {
					var project = response.data.projects[j];
					if (project.parent !== undefined) {
						var parent = projectMap[project.parent.id];
						if (parent.children === undefined) {
							parent.children = [];
						}
						parent.children.push(project);
					} else {
						topLevelProjects.push(project);
					}
				}

				deferredLoad.resolve(topLevelProjects);
			});
		}

		loadPromise = deferredLoad.promise;

		return loadPromise;
	};

	this.getTopLevelProjects = function () {
		return projectService.loadProjects().then(function (projects) {
			return topLevelProjects;
		});
	};

	this.get = function (id) {
		return projectService.loadProjects().then(function (projects) {
			return projectMap[id];
		});
	};

	this.getVersions = function (id) {
		return $http.get(ConfigurationService.getRestServiceBase() + "/projects/" + id + "/versions.json").then(function (response) {
			return response.data.versions;
		});
	};

	this.getTrackers = function () {
		if (angular.isDefined(trackersPromise)) {
			return trackersPromise;
		}

		trackersPromise = $http.get(ConfigurationService.getRestServiceBase() + "/trackers.json").then(function (response) {
			return response.data.trackers;
		});

		return trackersPromise;
	};

	//TODO: reload projects after delete
	this['delete'] = function (id) {
		return $http['delete'](ConfigurationService.getRestServiceBase() + "/projects/" + id + ".json");
	};

	this.getAllProjects = function () {
		return projectService.loadProjects().then(function (projects) {
			return allProjects;
		});
	};
});