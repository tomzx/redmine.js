'use strict';

module.exports = {
	less: {
		frontend: {
			src: [
				'public/assets/src/less/app.less',
				'public/assets/src/less/app/**/*.less',
			],
			files: {
				'public/assets/css/app.css': 'public/assets/src/less/app.less',
			},
		},
	},

	js: {
		frontend: {
			src: [
				'public/assets/src/js/app.js',
				'public/assets/src/js/**/*.js',
			],
			dist: 'public/assets/js/app.js',
		},
		components_frontend: {
			src: [
				'public/assets/src/vendor/jquery/dist/jquery.js',
				'public/assets/src/vendor/jquery.cookie/jquery.cookie.js',
				'public/assets/src/vendor/lodash/dist/lodash.compat.js',
				'public/assets/src/vendor/angular/angular.js',
				'public/assets/src/vendor/angular-resource/angular-resource.js',
				'public/assets/src/vendor/angular-route/angular-route.js',
				'public/assets/src/vendor/restangular/dist/restangular.js',
				'public/assets/src/vendor/js-yaml/dist/js-yaml.js',
				'public/assets/src/vendor/bootstrap/dist/js/bootstrap.js',
			],
			dist : 'public/assets/js/components.js',
		},
	},

	copy: {
		files: [
			{
				expand: true,
				cwd: 'assets/vendor/font-awesome/fonts',
				src: '*',
				dest: 'public/assets/fonts'
			},
			{
				expand: true,
				cwd: 'assets/vendor/bootstrap/dist/fonts',
				src: '*',
				dest: 'public/assets/fonts'
			}
		]
	}
};
