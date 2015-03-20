'use strict';

var gulp = require('gulp'),
	versionz = require('./index'),
	jshint = require('gulp-jshint');

gulp.task('publish', function() {
	versionz(function(err, info) {
		if (err) {
			console.log(err);
		} else if (info.changed) {
			console.log('package.json version changed from ' + info.then + ' to ' + info.now + ' last commit');
			process.env.RELEASE_VERSIONZ = true;
		} else {
			console.log('package.json did not change since last commit');
		}
	});
});

gulp.task('lint', function() {
	return gulp.src(['./src/*.js', 'gulpfile.js', 'index.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});