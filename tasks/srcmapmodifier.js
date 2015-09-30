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
        /**
         * @property base
         * @property {string} fileBase.src
         * @property {string} fileBase.dest
         */
        var options = this.options({});

        //grunt.log.writeln("sourcemap-modifier: Using\n\toptions %j\n\targs %j", options, arguments);

        //var dat = this.data;
        var files;
        if (this.files && this.files.length) {
            //grunt.log.writeln("data.files %j", dat.files);
            files = this.files;
        }
        else {
            //grunt.log.writeln("this.files %j", this.files);
            files = grunt.normalizeMultiTaskFiles(dat.files);
        }


        //if (!curTask.files.length && 'dFiles' in opts) {
        //    var df = opts.dFiles;
        //
        //    curTask.files = grunt.file.expandMapping(df.src, df.dest , df);
        //}

        //var files = grunt.file.expand(this.data.files);
        var base = options.base;

        //grunt.log.writeln("sourcemap-modifier: expanded files %j", files);

        if (!Array.isArray(files))
            files = [files];

        var processed;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //grunt.verbose.subhead("Processing " + file);
            var keys = Object.keys(base);
            processed = {};
            grunt.log.writeln("Processing sourceMap %j", file.src);
            var filedata = grunt.file.read(file.src, {encoding: "utf-8"});
            var parsed = JSON.parse(filedata);

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var dstBase = base[key];
                var count = 0;
                grunt.log.write("Processing mapping '%s' --> '%s'", key, dstBase);


                for (var srcNum in parsed.sources) {
                    var source = parsed.sources[srcNum];

                    if (!processed[source] && source.indexOf(key) === 0) {
                        source = source.replace(key, dstBase);
                        parsed.sources[srcNum] = source;
                        processed[source] = true;
                        //grunt.verbose.log("\n" + source);
                        count++;
                    }
                }
                grunt.log.writeln("  processed " + count);
            }
            if (typeof options.fileBase !== "undefined") {
                if (parsed.file.indexOf(options.fileBase.src) === 0) {
                    parsed.file = parsed.file.replace(
                        options.fileBase.src,
                        options.fileBase.dest
                    );
                }
            }
            grunt.file.write(file.dest, JSON.stringify(parsed));
        }
    });
};
