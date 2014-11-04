'use strict';

var autoprefixer = require('autoprefixer-core');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      html: {
        files: ['html/**/*.html'],
        tasks: ['copy']
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev']
      },
      images: {
        files: ['images/**']
      },
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['concat:dist']
      },
      vendor: {
        files: ['vendor/**/*.js'],
        tasks: ['concat:vendor']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '**/*.css',
            '**/*.jpg',
            '**/*.png',
            'dist/**/*.js',
            '**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "dist"
          },
          ghostMode: {
            clicks: false,
            scroll: false,
            links: false,
            forms: false
          },
          reloadDelay: 500,
        }
      }
    },

    sass: {
      dist: {
        options: {
            style: 'compressed'
        },
        expand: true,
        cwd: 'styles',
        src: ['*.scss'],
        dest: 'dist',
        ext: '.css'
      },
      dev: {
        options: {
          style: 'expanded',
          debugInfo: true,
          lineNumbers: true
        },
        expand: true,
        files: {
          'dist/app.css': 'scss/app.scss'
        } 
      }
    },


    postcss: {
        options: {
            map: true,
            processors: [
              autoprefixer({ browsers: ['last 3 versions'] }).postcss
            ]
        },
        dist: { src: 'dist/*.css' }
    },


    copy: {
      main: {
        files: [
          { expand: true, cwd: 'html/', src: ['**/*.html'], dest: 'dist/', filter: 'isFile' },
          { expand: true, cwd: 'images/', src: ['**/*.*'], dest: 'dist/', filter: 'isFile' }
        ]
      }
    },


    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['scripts/*.js'],
    //     dest: 'dist/scripts.js'
    //   },
    //   vendor: {
    //     src: ['vendor/*.js'],
    //     dest: 'dist/vendor.js'
    //   }
    // },


    // uglify: {
    //   dist: {
    //     options: {
    //       mangle: true,
    //       compress: true
    //     },
    //     files: {
    //       'dist/scripts.min.js': ['dist/scripts.js']
    //     }
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');
  
  grunt.registerTask('server', ["compile","browserSync", "watch"]);

  grunt.registerTask('compile', [
    'copy',
    'sass:dev',
    'postcss'//,
    // 'concat:dist',
    // 'concat:vendor'
  ]);

};
