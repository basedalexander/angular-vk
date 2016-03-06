var gulp = require('gulp');
var karma = require('karma').server;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


var scss = {
  input: 'src/assets/sass/app.scss',
  output: 'src/assets/css',
  options: {
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
};

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});


/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('sass', function () {
  return gulp.src(scss.input)
    .pipe(sourcemaps.init())
    .pipe(sass(scss.options)).on('error', sass.logError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(scss.output));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', ['sass']);
  return true;
});

gulp.task('default', ['test']);
