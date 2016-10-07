/**
 * Created with JetBrains WebStorm.
 * User: abdelkrim
 * Date: 2013-08-21
 * Time: 00:00
 * Copyright (c) 2013 ALT-F1, We believe in the projects we work on™
 */
/* jshint maxlen: 150 */

'use strict';

// Mount folder to connect.
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt) {

    // Load all Grunt tasks

    require('matchdep').filterDev('*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        appConfig: grunt.file.readJSON('./app/config/appConfig.json'),


        // Task configuration.

        // Clean folders before compile assets.
        clean: {
            dev: '<%= appConfig.app.dev %>',
            options: {
                force: true
            }
        },

        // Start local server.
        connect: {
            dev: {
                options: {
                    port: '<%= appConfig.app.devPort %>',
                    hostname: 'localhost',
                    middleware: function (connect) {
                        return [
                            //livereloadSnippet,
                            mountFolder(connect, grunt.template.process('<%= appConfig.app.dev %>')),
                            mountFolder(connect, grunt.template.process('<%= appConfig.app.src %>'))
                        ];
                    }
                }
            }
        },

        eslint: {
            nodeFiles: {
                options: {
                    configFile: "app/config/eslint-node.json"
                },
                src: ['<%= appConfig.app.src %>/app.js', '<%= appConfig.app.src %>/routes/**/*.js']
            },
            browserFiles: {
                options: {
                    configFile: "app/config/eslint-browser.json"
                },
                src: ['<%= appConfig.app.src %>/public/js/*.js']
            }            
        },

        nodemon: {
            src: {
                options: {
                    file: '<%= appConfig.app.src %>/<%= appConfig.app.rootPage %>',
                    args: ['development'],
                    nodeArgs: ['--debug'],
                    ignoredFiles: ['*.md', 'node_modules/**'],
                    watchedExtensions: ['js', 'jade', 'css'],
                    watchedFolders: ['<%= appConfig.app.src %>', '<%= appConfig.app.src %>/routes/**', '<%= appConfig.app.src %>/views/**'],
                    delayTime: 1,
                    env: {
                        PORT: '<%= appConfig.app.srcPort %>'
                    },
                    cwd: __dirname
                }
            }
        },

        // Open a web server with a given URL.

        open: {
            server: {
                path: 'http://localhost:<%= appConfig.app.devPort %>'
            }
        },

        server: {
            port: '<%= appConfig.app.devPort %>',
            base: './'
        },

        watch: {
            options: {
                spawn: false,
            },
            //every time a file is changed, a task is performed
            // gruntfile: {
            //     files: ['<%= eslint.app.src %>', '<%= eslint.gruntfile.src %>'],
            //     tasks: ['eslint:gruntfile', 'eslint:app' ]
            // },
            app: {
                files: '{<%= appConfig.app.dev %>,<%= appConfig.app.src %>}/**/*.{css,html,js,jpg,jpeg,png}',
                options: {
                    livereload: '<%= appConfig.app.livereloadPort %>'
                }
            },
            jade: {
                files: '<%= appConfig.app.src %>/**/*.jade',
                tasks: 'compile:jade',
                options: {
                    livereload: '<%= appConfig.app.livereloadPort %>'
                }
            }
        }
    });

    grunt.loadNpmTasks("gruntify-eslint");
    

    // Start local server and watch for changes in files.
    grunt.registerTask('src', [
        'eslint',
        'nodemon:src',
        'watch'
    ]);

    // Available tasks
    grunt.registerTask('default', ['eslint', 'src']);       
};

