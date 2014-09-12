gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
rename = require 'gulp-rename'

gulp.task 'default', ->
  gulp.src('src/tscontactform.coffee')
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(rename("code.gs"))
  .pipe(gulp.dest('dist'))