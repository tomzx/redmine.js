'use strict';

var _ = require('lodash');
var moment = require('moment');
var cfg = require('./build/grunt/cfg');

module.exports = function(grunt) {

	grunt.log.writeln('%s - Loading external tasks...', moment().format());

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);

	grunt.log.writeln('%s - done!', moment().format());

	grunt.loadTasks('./build/grunt/tasks');
	grunt.initConfig(_.merge.apply({}, _.values(cfg)));

	function alias(name, tasks) {
		grunt.registerTask(name, tasks.split(' '));
	}

	// Build tasks
	alias('css:debug', 'less:debug_frontend');
	alias('css:release', 'less:release_frontend');

	alias('js:debug', 'uglify:debug_app uglify:debug_components jshint:all');
	alias('js:release', 'ngAnnotate:release uglify:release');

	// Testing tasks
	alias('test', 'jshint:all');

	alias('build:debug', 'symlink:build copy:dist css:debug js:debug');
	alias('build:release', 'symlink:build copy:dist css:release js:release clean:build_symlink');

	// Development tasks
	alias('dev', 'build:debug watch');

	// Continuous integration
	alias('ci', 'build:release test');

	alias('default', 'dev');
};