/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Tyler Kellen, contributors
 * Licensed under the MIT license.
 *
 * Copyright 2015 Chris Watts
 */
module.exports = function (grunt) {
    'use strict';

    var requirejs = require('requirejs');
    var LOG_LEVEL_TRACE = 0, LOG_LEVEL_WARN = 2;

    requirejs.config({
        nodeRequire: require,
    });

    // TODO: extend this to send build log to grunt.log.ok / grunt.log.error
    // by overriding the r.js logger (or submit issue to r.js to expand logging support)
    //requirejs.define('node/print', [], function () {
    //    return function print(msg) {
    //        if (msg.substring(0, 5) === 'Error') {
    //            grunt.log.errorlns(msg);
    //            grunt.fail.warn('RequireJS failed.');
    //        } else {
    //            grunt.log.oklns(msg);
    //        }
    //    };
    //});

    grunt.registerMultiTask('requirejs', 'Build & optimise a RequireJS project.', function () {

        var done = this.async();
        /**
         * @callback doneCallback
         * @param {function} done
         * @param response
         */
        /**
         * @property {doneCallback} done - callback function for completion
         * @property {number} logLevel - 0=trace 4=off
         */
        var options = this.options({
            logLevel: grunt.option('verbose') ? LOG_LEVEL_TRACE : LOG_LEVEL_WARN,
            //empty impl incase the user doesn't provide one
            done: function (done, response) {
                done();
                grunt.verbose.write("Response ").writeln(typeof response);
            }
        });

        // The following catches errors in the user-defined `done` function and outputs them.
        var tryCatch = function (/* doneCallback */ fn, /* done */ done, output) {
            try {
                fn(done, output);
            } catch (e) {
                grunt.fail.warn('There was an error while processing your done function: "' + e + '"');
            }
        };

        if (this.files.length > 0 && grunt.option("verbose")) {
            grunt.verbose.warn("Ignoring passed in files");
            this.files.forEach(function (obj) {
                var output = [];
                if ('src' in obj) {
                    output.push(obj.src.length > 0 ? grunt.log.wordlist(obj.src) : '[no src]'.yellow);
                }
                if ('dest' in obj) {
                    output.push('-> ' + (obj.dest ? String(obj.dest).cyan : '[no dest]'.yellow));
                }
                if (output.length > 0) {
                    grunt.verbose.writeln('Files: ' + output.join(' '));
                }
            });
        }

        //requirejs("es6-symbol/polyfill");
        requirejs.optimize(options, tryCatch.bind(null, options.done, done));
    });
};
