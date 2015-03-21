'use strict';

var gulp = require('gulp'),
	versionz = require('./index'),
	jshint = require('gulp-jshint'),
	exec = require('child_process').exec;

gulp.task('publish', function(cb) {
	versionz(function(err, info) {
		if (err) {
			cb(err);
		} else if (info.changed) {
			console.log('package.json version changed from ' + info.then + ' to ' + info.now + ' last commit');
			exec('export RELEASE_VERSIONZ=true', function(error, stdout, stderr) {
				if (error) {
					return cb(error);
				}
				cb();
			});
		} else {
			console.log('package.json did not change since last commit');
			cb();
		}
	});
});

gulp.task('lint', function() {
	return gulp.src(['./src/*.js', 'gulpfile.js', 'index.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});