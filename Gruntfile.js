module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    // Project settings
    config: config,

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
          ]
        }]
      },
      server: '.tmp'
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
            'templates/**/*'
          ]
        }]
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/scripts',
          src: ['**/*.js'],
          dest: '.tmp/scripts'
        }]
      }
    },

    concat: {
      options: {
        sourceMap: true,
      },
      dist: {
        src: ['.tmp/scripts/*.js'],
        dest: '.tmp/built.js'
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: '.tmp/built.js.map'
      },
      dist: {
        src: '.tmp/built.js',
        dest: '<%= config.dist %>/built.js'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'clean:dist',
    'copy:dist',
    'babel',
    'concat',
    'uglify'
  ]);

};