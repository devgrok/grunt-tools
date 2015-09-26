/**
 * taken from     "grunt-sourcemap-modifier": "^0.1.1",
 */
'use strict';

//var sourceMap = require('source-map');

module.exports = function (grunt) {

    // ==========================================================================
    // TASKS
    // ==========================================================================
    // Create sourceRoot injections task
    grunt.registerMultiTask("srcmapmodifier", "SourceMap modifier to correct paths", function () {
        //console.log.writeln("sourcemap-modifier: Got files %j", this.options);

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({});

        //grunt.log.writeln("sourcemap-modifier: Using\n\toptions %j\n\targs %j", options, arguments);

        var dat = this.data;
        var files;
        if (this.data.files) {
            //grunt.log.writeln("data.files %j", dat.files);
            files = dat.files;
        }
        else {
            //grunt.log.writeln("this.files %j", this.files);
            files = this.files;
        }


        //if (!curTask.files.length && 'dFiles' in opts) {
        //    var df = opts.dFiles;
        //
        //    curTask.files = grunt.file.expandMapping(df.src, df.dest , df);
        //}

        //var files = grunt.file.expand(this.data.files);
        var base = dat.base;

        //grunt.log.writeln("sourcemap-modifier: expanded files %j", files);

        if (!Array.isArray(files))
            files = [files];

        for (var i =0; i<files.length; i++) {
            var file = files[i];
            //grunt.verbose.subhead("Processing " + file);
            for (var key in base) {
                var dstBase = base[key];
                grunt.log.writeln("Processing sourceMap %j ... '%s'", file.src, key);

                var filedata = grunt.file.read(file.src, {encoding: "utf-8"});
                var parsed = JSON.parse(filedata);

                for (var srcNum in parsed.sources) {
                    var source = parsed.sources[srcNum];

                    if (source.indexOf(key) === 0) {
                        parsed.sources[srcNum] = source.replace(key, dstBase);
                    }
                }

                if (typeof dat.fileBase !== "undefined") {
                    if (parsed.file.indexOf(dat.fileBase.src) === 0) {
                        parsed.file = parsed.file.replace(
                            dat.fileBase.src,
                            dat.fileBase.dst
                        );
                    }
                }
                grunt.file.write(file.dest, JSON.stringify(parsed));
            }
        }
    });
};
