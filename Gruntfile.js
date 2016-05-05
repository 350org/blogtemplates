module.exports = function( grunt ) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        checktextdomain: {
            options:{
                text_domain: 'blog_templates',
                keywords: [
                    '__:1,2d',
                    '_e:1,2d',
                    '_x:1,2c,3d',
                    'esc_html__:1,2d',
                    'esc_html_e:1,2d',
                    'esc_html_x:1,2c,3d',
                    'esc_attr__:1,2d',
                    'esc_attr_e:1,2d',
                    'esc_attr_x:1,2c,3d',
                    '_ex:1,2c,3d',
                    '_n:1,2,4d',
                    '_nx:1,2,4c,5d',
                    '_n_noop:1,2,3d',
                    '_nx_noop:1,2,3c,4d'
                ]
            },
            files: {
                src:  [
                    '**/*.php', // Include all files
                    '!node_modules/**', // Exclude node_modules/
                    '!blogtemplatesfiles/externals/**'
                ],
                expand: true
            }
        },

        copy: {
            main: {
                src:  [
                    '**',
                    '!npm-debug.log',
                    '!node_modules/**',
                    '!build/**',
                    '!bin/**',
                    '!.git/**',
                    '!Gruntfile.js',
                    '!package.json',
                    '!.gitignore',
                    '!.gitmodules',
                    '!sourceMap.map',
                    '!phpunit.xml',
                    '!travis.yml',
                    '!tests/**',
                    '!**/Gruntfile.js',
                    '!**/package.json',
                    '!**/README.md',
                    '!**/*~'
                ],
                dest: 'build/<%= pkg.name %>/'
            }
        },

        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: './build/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                expand: true,
                cwd: 'build/<%= pkg.name %>/',
                src: ['**/*'],
                dest: '<%= pkg.name %>/'
            }
        },

        // Generate POT files.
        makepot: {
            options: {
                type: 'wp-plugin',
                domainPath: 'lang',
                potHeaders: {
                    'report-msgid-bugs-to': 'https://wpmudev.org',
                    'language-team': 'LANGUAGE <EMAIL@ADDRESS>'
                }
            },
            dist: {
                options: {
                    potFilename: 'blog_templates.pot',
                    exclude: [
                        'node_modules/.*',
                        'blogtemplatesfiles/externals/.*'
                    ]
                }
            }
        },

        open: {
            dev : {
                path: '<%= pkg.projectEditUrl %>',
                app: 'Google Chrome'
            }
        },

        clean: {
            main: ['build/<%= pkg.name %>']
        }
    });

    grunt.registerTask('build', [
        'clean',
        'checktextdomain',
        'makepot',
        'copy',
        'compress',
        'open'
    ]);
};