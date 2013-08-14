module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    keepalive: true
                }
            }
        },
        watch: {
          livereload: {
            files: ['**/*'],
            options: {
              livereload: true,
            },
          },
        },
        open: {
            app: {
                path: 'http://localhost:8080/demo.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
}