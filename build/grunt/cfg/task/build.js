'use strict';

var config = require('../config.js');

module.exports = {
	clean: {
		build_symlink: ['public/assets/src'],
		js_release: ['public/assets/src/js/generated'],
	},

	copy: {
		dist: {
			files: config.copy.files
		},
	},

	less: {
		debug_frontend: {
			options: {
				sourceMap: true,
				sourceMapFilename: 'public/assets/css/app.map',
				sourceMapURL: 'app.map',
				sourceMapBasepath: 'public/assets',
				sourceMapRootpath: '../',
			},
			files: config.less.frontend.files,
		},
		release_frontend: {
			options: {
				cleancss: true,
			},
			files: config.less.frontend.files,
		},
	},

	ngAnnotate: {
		release: {
			files: {
				'public/assets/src/js/generated/app.js': config.js.frontend.src,
			},
		},
	},

	uglify: {
		debug_app: {
			files: {
				'public/assets/js/app.js': config.js.frontend.src,
			},
			options: {
				mangle: false,
				compress: false,
				preserveComments: 'all',
				beautify: true,
				sourceMap: true,
			},
		},
		debug_components: {
			files: {
				'public/assets/js/components.js': config.js.components_frontend.src,
			},
			options: {
				mangle: false,
				compress: false,
				preserveComments: 'all',
				beautify: true,
				sourceMap: true,
			},
		},
		release: {
			files: {
				'public/assets/js/app.js': 'public/assets/src/js/generated/app.js',
				'public/assets/js/components.js': config.js.components_frontend.src,
			},
			options: {
				report: 'min',
				preserveComments: 'some',
			},
		},
	},
};