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
                    configFile: 'app/config/eslint-node.json'
                },
                src: ['<%= appConfig.app.src %>/app.js', '<%= appConfig.app.src %>/routes/**/*.js']
            },
            browserFiles: {
                options: {
                    configFile: 'app/config/eslint-browser.json'
                },
                src: ['<%= appConfig.app.src %>/public/js/*.js']
            }            
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    //'<%= appConfig.app.dist %>': '<%= appConfig.app.dist %>'
                    //'<%= appConfig.app.src %>/public/js/*.js': 'dist/app/public/js/*.js'
                    'dist/app/public/js/contact.js': 'app/public/js/contact.js',
                    'dist/app/public/js/custom.js': 'app/public/js/custom.js',
                    'dist/app/public/js/esing.js': 'app/public/js/easing.js',
                    'dist/app/public/js/main.js': 'app/public/js/main.js',
                    'dist/app/public/js/online-scan.js': 'app/public/js/online-scan.js',
                    'dist/app/public/js/style-switcher.js': 'app/public/js/style-switcher.js'
                }
            }
        },
        // uglify: {
        //     options: {
        //         mangle: {
        //         }
        //     },
        //     app: {
        //         files: {
        //             'dist/app/public/js/app.min.js':'dist/app/public/js/*.js'
        //         }
        //     }
        // },
        // cssmin: {
        //     // options: {
        //     //     shorthandCompacting: false,
        //     //     roundingPrecision: -1
        //     // },
        //     target: {
        //         files: [{
        //             expand: true,
        //             cwd: 'app/public/css',
        //             dest: 'dist/app/public/css',
        //             ext: '.min.css',
        //             src: ['*.css', '!*.min.css']
        //         }]
        //     }
        // },
        jadeUsemin: {
            scripts: {
                options: {
                    prefix: 'app/public',
                    targetPrefix: 'dist/app/public',
                    failOnMissingSource: true, // optional 
                    tasks: {
                        concat: ['concat'],
                        js: ['concat', 'babel', 'uglify'],
                        css: ['concat', 'cssmin']
                    }
                },
                files: {
                    'dist/app/views/one.jade': 'app/views/one.jade',
                    'dist/app/views/online-scan.jade': 'app/views/online-scan.jade',
                    'dist/app/views/carousel.jade': 'app/views/carousel.jade',
                    'dist/app/views/about.jade': 'app/views/about.jade',
                    'dist/app/views/layout.jade': 'app/views/layout.jade'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    // includes files within path
                    {expand: true, src: ['Dockerfile','package.json','docker-*.yml'], dest: 'dist/', filter: 'isFile'},
                    {expand: true, src: [
                        'app/app.js', //FIXME optimize
                        'app/config/**/*',
                        'app/routes/**/*',
                        'app/views/**/*',
                        'app/public/fonts/**/*',
                        'app/public/media/**/*',
                        'app/public/images/**/*',
                        'app/public/img/**/*',
                        'app/public/css/*.min.css',          
                        'app/public/css/bootstrap/**/*',                        
                        'app/public/css/fonts/**/*',            
                        'app/public/js/assets/**/*',
                        'app/public/bootstrap-3.3.1/**/*',
                        'app/public/bower_components/**/*',
                    ], dest: 'dist/'}
                ]
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
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-jade-usemin');    

    // Start local server and watch for changes in files.
    grunt.registerTask('src', [
        'eslint',
        'nodemon:src',
        'watch'
    ]);
    grunt.registerTask('dist', [
        'clean',
        'copy',
        'jadeUsemin'
    ]);

    // Available tasks
    grunt.registerTask('default', ['eslint', 'src']);
};

