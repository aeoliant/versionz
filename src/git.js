'use strict';
var exec = require('child_process').exec,
    Q = require("q");

var getParentCommitSha = function() {
   var deferred = Q.defer();
   exec('git log --first-parent -1 --skip=1 --pretty=%H', function(error, stdout, stderr) {
      if (error) {
         deferred.reject(new Error(error));
      } else {
         var sha = stdout.trim();
         if (sha === null) {
            deferred.reject(new Error("Could not get hash of last commit"));
         } else if (sha.length != 40) {
            deferred.reject(new Error("Hash of last commit is not 40 characters " + stdout));
         } else {
            deferred.resolve(sha);
         }
      }
   });
   return deferred.promise;
};

var useItToGetOldPackageJson = function(sha) {
   var deferred = Q.defer();
   exec('git show ' + sha + ':package.json', function(error, stdout, stderr) {
      if (error) {
         deferred.reject(new Error(error));
      } else {
         deferred.resolve(JSON.parse(stdout).version);
      }
   });
   return deferred.promise;
};

var compareWithCurrentPackageJson = function(oldVersion) {
   var deferred = Q.defer();
   exec('git show HEAD:package.json', function(error, stdout, stderr) {
      if (error) {
         deferred.reject(new Error(error));
      } else {
         var newVersion = JSON.parse(stdout).version;
         deferred.resolve({
            then: oldVersion,
            now: newVersion,
            changed: oldVersion != newVersion
         });
      }
   });
   return deferred.promise;
};

module.exports = function(cb) {
   getParentCommitSha().then(useItToGetOldPackageJson).then(compareWithCurrentPackageJson)
      .then(function(info) {
         cb(null, info);
      })
      .fail(function(error) {
         cb(error, null);
      });
};