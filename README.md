# versionz
[![Build Status](https://travis-ci.org/aeoliant/versionz.svg?branch=master)](https://travis-ci.org/aeoliant/versionz)

Uses `git` to look at your previous `package.json` to determine if there was a version change

```js
var versionz = require('versionz');

versionz(function(err, info) {
	if (err) {
		console.log(err);
	} else if (info.changed) {
		console.log('package.json version changed from ' + info.then +
		 ' to ' + info.now + ' last commit');
	} else {
		console.log('package.json did not change since last commit');
	}
});
```

## cli

There is a command-line interface. Run `npm install -g versionz`. `versionz` runs git commands in the current directory to look at your previous `package.json` to determine if there was a version change

<pre>
<b>$ versionz --help</b>
Usage:
  versionz.js [OPTIONS] [ARGS]

Options: 
  -q, --quiet            quiet mode
  -h, --help             Display help and usage details
<b>$ versionz</b>
ERROR: package.json did not change since last commit
<b>$ versionz -q && echo true</b>
<b>$ cd versionz_test/ && versionz</b>
OK: package.json changed from 0.0.7 to 0.0.8
<b>$ versionz -q && echo true</b>
true
</pre>
