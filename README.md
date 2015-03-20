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
