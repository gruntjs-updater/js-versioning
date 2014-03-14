# js-versioning

> A plugin for bumping a version number in a javascript file for your application

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install js-versioning --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('js-versioning');
```

## The "js_versioning" task

### Overview
In your project's Gruntfile, add a section named `js_versioning` to the data object passed into `grunt.initConfig()`.


    grunt.initConfig({
      js_versioning: {
            options: {
				majorVersion: [x],
				minorVersion: [y],
				versionFile: [relative path to version file]
				outputFile: [relative path to output file]
            },
            your_target: {
	            options: {
					majorVersion: [x],
					minorVersion: [y],
					versionFile: [relative path to version file]
					outputFile: [relative path to output file]
	            },
            },
        },
    });


### Options

#### majorVersion
Type: `int`
Default value: `0`

An integer value representing the first number in the version number - X in 'X.Y.Z'

#### minorVersion
Type: `int`
Default value: `0`

An integer value representing the second number in the version number - Y in 'X.Y.Z'

#### versionFile
Type: `string`
Default value: `Not Applicable`

A relative path to a file that stores the current version number.  This file should be empty to start.

#### outputFile
Type: `string`
Default value: `Not Applicable`

A relative path to a file that will be updated with the new version number.  This file can contain either of the following replacement strings:

`<!version-->` - Will get replaced with the version number

`<!timestamp-->` - Will get replaced with the timestamp of when that version was created

### Usage Examples

#### Default Options
In this example, the default options are used to start versioning. If the `versionFile` has no content and the `outputFile` file had the content `<!version-->` somewhere in it, the generated result in the output file would be `0.0.1` on the first execution, `0.0.2` on the second, etc...etc...

	grunt.initConfig({
	  js_versioning: {
	    options: {
	        versionFile: "js/.version",
			outputFile: "app.js"
	    }
	  },
	});

######outputFile content - `0.0.1`
######versionFile content - `0.0.1`

#### Specific starting major and minor versions
In this example, we explicitly specify the starting major and minor version numbers.  If the `versionFile` has no content and the `outputFile` had the content `<!version-->` somewhere in it, the generated result in the output file would be `1.5.1` on the first execution, `1.5.2` on the second, etc...etc...

If the `versionFile` has a version number in it already, the major version will be retained:

######outputFile content - `2.4.1` - result: `1.4.2`

As you can see, the major version defined in the gruntfile is always retained, regardless of what is in the version file.  The minor version is always kept to what is in the version file.

	grunt.initConfig({
	  js_versioning: {
	    options: {
			majorVersion: 1,
			minorVersion: 5, //Optional here (unless the output file is empty, this value will never be used)
	        versionFile: "js/.version",
			outputFile: "app.js"
	    }
	  },
	});

#### Minor version incrementing
If the build version hits `100` the minor version is incremented by `1`:

######outputFile content - `2.4.99` - result: `2.5.0`

	grunt.initConfig({
	  js_versioning: {
	    options: {
	        versionFile: "js/.version",
			outputFile: "app.js"
	    }
	  },
	});

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
3/14/2014 - Version 1.0.4 released