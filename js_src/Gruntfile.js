module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n\n\n'
      },
      dist: {
        files: [
        {src: ['../v5/assets/js/jquery-1.8.0.min.js',
               '../v5/assets/js/modernizr.min.js',
               '../v5/assets/js/jpanelmenu-1.0.0.min.js',
               '../v5/assets/js/jquery.popbox.min.js',
               '../v5/assets/libraries/codemirror/lib/codemirror.min.js',
               '../v5/assets/libraries/codemirror/mode/xml/xml.min.js',
               '../v5/assets/libraries/codemirror/mode/javascript/javascript.min.js',
               '../v5/assets/libraries/codemirror/css.min.js',
               '../v5/assets/libraries/codemirror/htmlmixed.min.js'],
               dest: '../v5/assets/js/third_party.js' },
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: [
          {src: ['../v5/assets/js/jpanelmenu-1.0.0.js'], dest: '../v5/assets/js/jpanelmenu-1.0.0.min.js'},
          {src: ['../v5/assets/js/jquery.popbox.js'], dest: '../v5/assets/js/jquery.popbox.min.js'},
          {src: ['../v5/assets/libraries/codemirror/mode/xml/xml.js'], dest: '../v5/assets/libraries/codemirror/mode/xml/xml.min.js'},
          {src: ['../v5/assets/libraries/codemirror/mode/javascript/javascript.js'], dest: '../v5/assets/libraries/codemirror/mode/javascript/javascript.min.js'},
          {src: ['../v5/assets/libraries/codemirror/mode/css/css.js'], dest: '../v5/assets/libraries/codemirror/mode/css/css.min.js'},
          {src: ['../v5/assets/libraries/codemirror/mode/htmlmixed/htmlmixed.js'], dest: '../v5/assets/libraries/codemirror/mode/htmlmixed/htmlmixed.min.js'}
        ]
      }
    },
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['uglify', 'concat']);

};