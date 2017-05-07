/**
 * Created by Edxe .
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var gulpSequence = require('gulp-sequence');
var shell = require('gulp-shell');

gulp.task('uglify', function (cb) {

    return gulp.src('gps-server.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))

});


gulp.task('clean', function (cb) {
    console.log('cleaning...');
    return gulp.src('dist/', {read: false})
        .pipe(clean());

});

gulp.task('default', function (cb) {
    return gulp.src('index.js', {read: false})
        .pipe(shell(['browserify --node <%= f(file.path) %> -o gps-server.js'], {
            templateData: {f: function (s) { return s}}
        }));


});

gulp.task('package', function (cb) {
    console.log('packaging...');
    return gulp.src('dist/**')
        .pipe(tar('gps-srv.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist', gulpSequence('clean', 'default','uglify'));

//browserify --node index.js -o bridge-server.js

