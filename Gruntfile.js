/*global module*/

(function () {
  'use strict';

  module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        options: {
          separator: '\n\n',
          stripBanners: true,
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
          process: function (src, filepath) {
            return ('//' + filepath + '\n' + src + ';').replace(/;;/g, ';');
          }
        },
        src: {
          src: [
            'bower_components/lodash/lodash.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'src/app.js',
            'src/**/*.js'
          ],
          dest: 'dist/app.js'
        }

      },
      jst: {
        dev: {
          options: {
            namespace: '$$jst'
          },
          files: {
            'dist/jst.js': 'src/**/*.html'
          }
        }
      },
      watch: {
        scripts: {
          files: 'src/**/*',
          tasks: ['build'],
          options: {
            interrupt: true
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['build', 'watch']);
    grunt.registerTask('build', ['jst', 'concat:src']);
  };

})();