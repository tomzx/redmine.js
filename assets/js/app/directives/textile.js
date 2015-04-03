redmineApp.directive('textile', function() {
	return {
		restrict: 'AE',
		scope: {
			textile: '=',
		},
		link: function(scope, element, attrs) {
			var html = textile(scope.textile);
			element.html(html);
		},
	};
});