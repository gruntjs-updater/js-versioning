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

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = function(grunt) {
	grunt.registerMultiTask('jsversion', 'A plugin for bumping a version number in a javascript file for your application', function() {
		grunt.log.writeln('Versioning output file')

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			majorVersion: '',
			minorVersion: '',
			versionFile: '',
			outputFile: ''
		});

		grunt.log.writeln('Version file: ' + options.versionFile);
		grunt.log.writeln('Output file: ' + options.outputFile);

		if (!grunt.file.exists(options.versionFile))
		{
			grunt.log.warn('Versioning file ' + chalk.cyan(options.versionFile) + ' not found.');
			return;
		}

		if (!grunt.file.exists(options.outputFile))
		{
			grunt.log.warn('Output file ' + chalk.cyan(options.versionFile) + ' not found.');
			return;
		}

		var sourceContent = grunt.file.read(options.versionFile);
		if (sourceContent.length == 0) sourceContent = "0";
		var buildVersion = parseInt(sourceContent);
		grunt.log.writeln('Old Version: ' + buildVersion);

		if (isNaN(buildVersion))
		{
			grunt.log.warn('Version file content is not valid.  Expected integer, received ' + sourceContent);
			return;
		}

		buildVersion = buildVersion + 1;
		var newVersion = options.majorVersion + "." + options.minorVersion + "." + buildVersion;

		grunt.log.writeln('Writing new version: ' + newVersion);
		grunt.file.write(options.versionFile, buildVersion);

		var d = new Date();
		var h = d.getHours();
		var isPM = false;
		if (h > 12) 
		{
			h = h - 12;
			isPM = true;
		}

		h = pad(h, 2);
		var s = d.getSeconds();
		s = pad(s, 2);
		var m = d.getMinutes();
		m = pad(m, 2);
		var timestamp = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + h + ":" + m + "." + s + " " + (isPM ? "PM" : "AM");

		var destinationContent = grunt.file.read(options.outputFile);
		destinationContent = destinationContent.replace(/<!version--!>/g, newVersion)
		destinationContent = destinationContent.replace(/<!timestamp--!>/g, timestamp);

		grunt.log.writeln('Performing output replacements');
		grunt.file.write(options.outputFile, destinationContent);

		grunt.log.writeln('Complete');
	});
};
