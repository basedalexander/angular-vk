var gulp = require('gulp');
var karma = require('karma').server;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


var scss = {
  input: 'app/styles/sass/app.scss',
  output: 'app/styles',
  options: {
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
};


gulp.task('sass', function () {
  return gulp.src(scss.input)
    .pipe(sourcemaps.init())
    .pipe(sass(scss.options)).on('error', sass.logError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(scss.output));
});

gulp.task('watch', function () {
  gulp.watch('app/styles/**/*.scss', ['sass']);
  return true;
});

gulp.task('default', ['watch']);
