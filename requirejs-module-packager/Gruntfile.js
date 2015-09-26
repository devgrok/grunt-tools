/*
 * grunt-module-packager
 * https://github.com/devgrok/grunt-module-packager
 *
 * Copyright (c) 2015 Chris Watts
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
//            jshint: {
//                all: [
//                    'Gruntfile.js',
//                    'tasks/*.js',
//                    '<%= nodeunit.tests %>'
//                ],
//                options: {
//                    jshintrc: '.jshintrc'
//                }
//            },

            // Before generating any new files, remove any previously-created files.
            clean: {
                tests: ['tmp']
            },

            // Configuration to be run (and then tested).
            srcmapmodifier: {
                default_options: {
                    options: {},
                    files: {
                      //  'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
                    }
                },
                custom_options: {
                    options: {
                        separator: ': ',
                        punctuation: ' !!!'
                    },
                    files: {
                      //  'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
                    }
                },
            },
            requirejs: {
                default_options: {
                    options: {
                        paths: {"es6-symbol": "scripts-dev/es6-symbol",}
                    },
                    files: {
                        //'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
                    }
                },
                custom_options: {
                    options: {
                        separator: ': ',
                        punctuation: ' !!!'
                    },
                    files: {
                        //'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
                    }
                }

            },

            // Unit tests.
            nodeunit: {
                tests: ['test/*_test.js']
            }
        }
    )
    ;

// Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

// These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

// Whenever the "test" task is run, first clean the "tmp" dir, then run this
// plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'requirejs', 'srcmapmodifier', 'nodeunit']);
    grunt.registerTask('test', ['clean']);

// By default, lint and run all tests.
//'jshint',
    grunt.registerTask('default', ['test']);

}
;
