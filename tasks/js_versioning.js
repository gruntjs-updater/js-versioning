/*
 * js-versioning
 * https://github.com/rpetz/js-versioning
 *
 * Copyright (c) 2014 Robert Petz
 * Licensed under the MIT license.
 *
 * NOTE: Some of this code is built from code in the grunt-contrib-uglify project - credit where credit is due
 */

'use strict';

var path = require('path');

/* From grunt-contrib-uglify */
// Return the relative path from file1 => file2
var relativePath = function(file1, file2) {
	var file1Dirname = path.dirname(file1);
	var file2Dirname = path.dirname(file2);
	if (file1Dirname !== file2Dirname)
		return path.relative(file1Dirname, file2Dirname) + path.sep;
	return "";
};

module.exports = function(grunt) {
	grunt.registerMultiTask('version', 'A plugin for bumping a version number in a javascript file for your application', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			majorVersion: '',
			minorVersion: '',
		});

		var source = this.versionFile;
		var output = this.outputFile;

		if (!grunt.file.exists(source))
		{
			grunt.log.warn('Versioning file ' + chalk.cyan(source) + ' not found.');
			return;
		}

		if (!grunt.file.exists(output))
		{
			grunt.log.warn('Output file ' + chalk.cyan(source) + ' not found.');
			return;
		}

		var sourceContent = grunt.file.read(source);
		if (sourceContent.length == 0) sourceContent = "0";
		var buildVersion = parseInt(sourceContent);

		if (isNaN(buildVersion))
		{
			grunt.log.warn('Version file content is not valid.  Expected integer, received ' + sourceContent);
			return;
		}

		buildVersion++;
		var newVersion = majorVersion + "." + minorVersion + "." + buildVersion;

		grunt.log.writeln('Writing new version: ' + newVersion);
		grunt.file.write(source, buildVersion);

		var destinationContent = grunt.file.read(output);
		destinationContent = destinationContent.replace(/<!version--!>/g, newVersion)
		destinationContent = destinationContent.replace(/<!timestamp--!>/g, (new Date()).toLocaleString());

		grunt.log.writeln('Performing output replacements');
		grunt.file.write(output, destinationContent);

		grunt.log.writeln('Complete');
	});
};
