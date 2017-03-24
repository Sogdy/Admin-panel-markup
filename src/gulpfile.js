'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps');


// Local server for livereload
gulp.task('connect', function() {
    connect.server({
        root: '../build',
        livereload: true
    });
});


//Jade
gulp.task('pug', function() {
   gulp.src('./pug/pages/*.pug')
       .pipe(pug({
        pretty: true
        }))
       .pipe(gulp.dest('../build'))
       .pipe(connect.reload())
});


// SCSS
gulp.task('scss', function () {
    gulp.src('scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 10 versions']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../build/css'))
        .pipe(connect.reload());
});

// CSS
gulp.task('css', function(){
    gulp.src('css/**.css')
        .pipe(gulp.dest('../build/css'));
});

// JS
gulp.task('script', function(){
    gulp.src('js/**.js')
        .pipe(gulp.dest('../build/js'));
});


//Fonts
gulp.task('fonts', function () {
    gulp.src('fonts/*')
        .pipe(gulp.dest('../build/fonts'));
});


//Images
gulp.task('images', function () {
    gulp.src('images/*')
        .pipe(gulp.dest('../build/images'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['scss']);
    gulp.watch('./pug/**/*.pug', ['pug']);
});

gulp.task('default', ['connect', 'pug', 'scss', 'css', 'fonts', 'images', 'script', 'watch']);