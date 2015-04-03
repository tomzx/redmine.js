redmineApp.service('TrackerService', ['Restangular', function (Restangular) {
	var trackersPromise;

	this.getTrackers = function () {
		if (angular.isDefined(trackersPromise)) {
			return trackersPromise;
		}

		trackersPromise = Restangular.all('trackers').getList();

		return trackersPromise;
	};

	this.getTrackerMapping = function (tracker) {
		if (tracker.name === "Bug") {
			return "danger";
		}
		return "default";
	};
}]);