var gulp = require('gulp');
    watch = require('gulp-watch');

var glob = require("glob")
var emailBuilder = require('gulp-email-builder');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var rename = require("gulp-rename");

var options = { 
  encodeSpecialChars: true,
};

var builder = emailBuilder(options);

gulp.task('watch', function() { 
    console.log("Watching compiled for changed to index.html and outputing inlined version");
    return gulp.src('compiled/**/index.html')
      .pipe(watch('compiled/**/index.html'))
      .pipe(rename(function (path) {
      path.basename += "-inlined";
      }))
      .pipe(replace('src="/', 'src="'))
      .pipe(replace('href="/', 'href="'))
      .pipe(emailBuilder(options).inlineCss())
      /*.pipe(shorthand())*/
      .pipe(htmlmin({ collapseWhitespace: false }))
      .pipe(replace('=/img', '=img'))
      .pipe(replace('  ', ''))
      .pipe(replace('\t', ''))
      .pipe(gulp.dest('compiled/'));
 });