// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe(rename('application.min.css'))
        .pipe(gulp.dest('dist/assets/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('application.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename('application.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('src/styles/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
