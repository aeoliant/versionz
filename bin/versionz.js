#!/usr/bin/env node

var cli = require('cli'),
	versionz = require('../index.js');

cli.parse({
	quiet: ['q', 'quiet mode']
});

cli.main(function(args, options) {
	versionz(function(err, info) {
		if (err) {
			if (options.quiet) {
				cli.exit(1);
			} else {
				cli.fatal(err);
			}
		} else if (!info.changed) {
			if (options.quiet) {
				cli.exit(1);
			} else {
				cli.fatal('package.json did not change since last commit');
			}
		} else {
			if (options.quiet) {
				cli.exit();
			} else {
				cli.ok('package.json changed from ' + info.then + ' to ' + info.now);
			}
		}
	});
});