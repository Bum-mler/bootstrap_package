module.exports = function(grunt) {

    /**
     * Project configuration.
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            root: '../',
            node: 'node_modules/',
            resources: '<%= paths.root %>Resources/',
            less: '<%= paths.resources %>Public/Less/',
            css: '<%= paths.resources %>Public/Css/',
            fonts: '<%= paths.resources %>Public/Fonts/',
            images: '<%= paths.resources %>Public/Images/',
            js: '<%= paths.resources %>Public/JavaScript/'
        },
        cssmin: {
            options: {
                keepSpecialComments: '*',
                advanced: false
            },
            theme: {
                src: '<%= paths.css %>theme.css',
                dest: '<%= paths.css %>theme.min.css'
            }
        },
        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: 'some'
            },
            bootstrapLightbox: {
                src: '<%= paths.js %>Src/bootstrap.lightbox.js',
                dest: '<%= paths.js %>Dist/bootstrap.lightbox.min.js'
            },
            bootstrapNavbarToggle: {
                src: '<%= paths.js %>Src/bootstrap.navbartoggle.js',
                dest: '<%= paths.js %>Dist/bootstrap.navbartoggle.min.js'
            },
            bootstrapPopover: {
                src: '<%= paths.js %>Src/bootstrap.popover.js',
                dest: '<%= paths.js %>Dist/bootstrap.popover.min.js'
            },
            bootstrapSwipe: {
                src: '<%= paths.js %>Src/bootstrap.swipe.js',
                dest: '<%= paths.js %>Dist/bootstrap.swipe.min.js'
            },
            equalheight: {
                src: '<%= paths.js %>Src/jquery.equalheight.js',
                dest: '<%= paths.js %>Dist/jquery.equalheight.min.js'
            },
            responsiveimages: {
                src: '<%= paths.js %>Src/jquery.responsiveimages.js',
                dest: '<%= paths.js %>Dist/jquery.responsiveimages.min.js'
            },
            viewportfix: {
                src: '<%= paths.js %>Src/windowsphone-viewportfix.js',
                dest: '<%= paths.js %>Dist/windowsphone-viewportfix.min.js'
            }
        },
        less: {
            theme: {
                options: {
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'theme.css.map',
                    sourceMapFilename: '<%= paths.css %>theme.css.map'
                },
                src: '<%= paths.less %>Theme/theme.less',
                dest: '<%= paths.css %>theme.css'
            }
        },
        watch: {
            bootstrapLightbox: {
                files: '<%= paths.js %>Src/bootstrap.lightbox.js',
                tasks: 'uglify:bootstrapLightbox'
            },
            bootstrapNavbarToggle: {
                files: '<%= paths.js %>Src/bootstrap.navbartoggle.js',
                tasks: 'uglify:bootstrapNavbarToggle'
            },
            bootstrapPopover: {
                files: '<%= paths.js %>Src/bootstrap.popover.js',
                tasks: 'uglify:bootstrapPopover'
            },
            bootstrapSwipe: {
                files: '<%= paths.js %>Src/bootstrap.swipe.js',
                tasks: 'uglify:bootstrapSwipe'
            },
            equalheight: {
                files: '<%= paths.js %>Src/jquery.equalheight.js',
                tasks: 'uglify:equalheight'
            },
            responsiveimages: {
                files: '<%= paths.js %>Src/jquery.responsiveimages.js',
                tasks: 'uglify:responsiveimages'
            },
            viewportfix: {
                files: '<%= paths.js %>Src/windowsphone-viewportfix.js',
                tasks: 'uglify:viewportfix'
            },
            less: {
                files: '<%= paths.less %>**/*.less',
                tasks: 'less'
            }
        },
        copy: {
            jquery: {
                files: [
                    {
                        cwd: '<%= paths.node %>jquery/dist/',
                        src: 'jquery.min.js',
                        dest: '<%= paths.js %>Libs/',
                        expand: true
                    }
                ]
            },
            hammerjs: {
                files: [
                    {
                        cwd: '<%= paths.node %>hammerjs/',
                        src: [
                            'hammer.min.js'
                        ],
                        dest: '<%= paths.js %>Libs/',
                        expand: true
                    }
                ]
            },
            photoswipe: {
                files: [
                    {
                        cwd: '<%= paths.node %>photoswipe/dist/',
                        src: [
                            'photoswipe.min.js',
                            'photoswipe-ui-default.min.js'
                        ],
                        dest: '<%= paths.js %>Libs/',
                        expand: true
                    },
                    {
                        cwd: '<%= paths.node %>photoswipe/dist/default-skin/',
                        src: [
                            'default-skin.png',
                            'default-skin.svg',
                            'preloader.gif'
                        ],
                        dest: '<%= paths.images %>PhotoSwipe/',
                        expand: true
                    }
                ]
            },
            bootstrap3: {
                files: [
                    {
                        cwd: '<%= paths.node %>bootstrap/dist/js/',
                        src: 'bootstrap.min.js',
                        dest: '<%= paths.js %>Libs/',
                        expand: true
                    },
                    {
                        cwd: '<%= paths.node %>bootstrap/dist/fonts/',
                        src: '*',
                        dest: '<%= paths.fonts %>',
                        expand: true
                    },
                    {
                        cwd: '<%= paths.node %>bootstrap/less/',
                        src: '**',
                        dest: '<%= paths.less %>Bootstrap/',
                        expand: true
                    }
                ]
            }
        }
    });

    /**
     * Register tasks
     */
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /**
     * Grunt update task
     */
    grunt.registerTask('update', ['copy']);
    grunt.registerTask('css', ['less', 'cssmin']);
    grunt.registerTask('js', ['uglify', 'cssmin']);
    grunt.registerTask('build', ['update', 'css', 'js']);
    grunt.registerTask('default', ['build']);

};
