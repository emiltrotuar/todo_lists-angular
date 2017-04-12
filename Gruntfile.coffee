module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    jshint:
      all: ['app/assets/**/*.js']
    watch:
      scripts:
        files: ['app/assets/**/*.*','spec/javascripts/**/*.coffee']
        tasks: ['jshint']
        options:
          spawn: false
          livereload: true
      html:
        files: ['public/elements/test.*']
        options:
          spawn: false
          livereload: true

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.event.on 'watch', (action, filepath, target) ->
    grunt.log.writeln target + ': ' + filepath + ' has ' + action
  grunt.registerTask "default", ["watch"]
