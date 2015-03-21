# versionz
[![Build Status](https://travis-ci.org/aeoliant/versionz.svg?branch=master)](https://travis-ci.org/aeoliant/versionz)

Uses `git` to look at your previous `package.json` to determine if there was a version change

```js
var versionz = require('versionz');

versionz(function(err, info) {
	if (err) {
		console.log(err);
	} else if (info.changed) {
		console.log('package.json version changed from ' + info.then + ' to ' + info.now + ' last commit');
	} else {
		console.log('package.json did not change since last commit');
	}
});
```

##cli

There is a command-line interface. Run `npm install -g versionz`

```bash
$ versionz
ERROR: package.json did not change since last commit
$ versionz && echo true
ERROR: package.json did not change since last commit
$ cd versionz_test/ && versionz
OK: package.json changed from 0.0.7 to 0.0.8
$ versionz && echo true
OK: package.json changed from 0.0.7 to 0.0.8
true
```
