module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            build: {
                options : {
                    style : 'compressed'
                },
                files: {
                    'assets/css/app.min.css': 'assets/sass/app.scss'
                }
            }
        },
        // jshint: {
        //     files: ['src/assets/js/**/*.js'],
        //     options: {
        //         globals: {
        //           jQuery: true
        //         }
        //     }
        // },
        // concat: {
        //   dist: {
        //     src: ['src/assets/js/**/*.js'],
        //     dest: 'build/assets/js/app.js',
        //   },
        // },
        // uglify : {
        //     my_target: {
        //         files: {
        //             'build/assets/js/app.min.js' : 'build/assets/js/app.js'
        //         }
        //     }
        // },
        watch: {
            // js: {
            //     files: ['src/assets/js/**/*.js'],
            //     tasks: ['jshint', 'concat', 'uglify']
            // },
            sass: {
                files: ['assets/sass/**/*.{scss,sass}'],
                tasks: ['sass']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // grunt.loadNpmTasks('grunt-php');

    // register tasks
    grunt.registerTask('default', ['watch']); // default
    // grunt.registerTask('serve', ['sass', 'concat', 'uglify', 'htmlmin', 'php', 'watch']); // this should be default maybe - build/serve/watch
    // grunt.registerTask('build', ['sass', 'concat', 'uglify', 'htmlmin']); // build

};
