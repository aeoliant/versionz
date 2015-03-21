#!/usr/bin/env node

var cli = require('cli'),
	versionz = require('../index.js');

cli.main(function() {
	versionz(function(err, info) {
		if (err) {
			cli.fatal(err);
		} else if (!info.changed) {
			cli.fatal('package.json did not change since last commit');
		} else {
			cli.ok('package.json changed from ' + info.then + ' to ' + info.now);
		}
	});
});