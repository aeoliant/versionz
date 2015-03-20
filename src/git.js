'use strict';
var exec = require('child_process').exec;

var getParentCommitSha = function(cb) {
   exec('git log --first-parent -1 --skip=1 --pretty=%H', function(error, stdout, stderr) {
      if (error) {
         cb('1' + error, null);
      } else {
         var commit_hash = stdout.trim();
         if (commit_hash === null) {
            cb("Could not get hash of last commit", null);
         } else if (commit_hash.length != 40) {
            cb("Hash of last commit is not 40 characters " + stdout, null);
         } else {
            cb(null, commit_hash);
         }
      }
   });
};

module.exports = function(cb) {
   getParentCommitSha(function(err, sha) {
      if (err) {
         cb('2' + err, null);
      } else {
         exec('git checkout ' + sha + ' package.json && cat package.json', function(error, stdout, stderr) {
            if (error) {
               cb('3' + error, null);
            } else {
               var oldVer = JSON.parse(stdout).version;
               exec('git reset HEAD package.json --quiet && git checkout package.json && cat package.json', function(erro, stdou, stder) {
                  if (erro) {
                     cb('4' + erro, null);
                  } else {
                     var newVer = JSON.parse(stdou).version;
                     var ret = {
                        then: oldVer,
                        now: newVer,
                        changed: oldVer != newVer
                     };
                     cb(null, ret);
                  }
               });
            }
         });
      }
   });
};