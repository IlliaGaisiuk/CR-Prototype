var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch(['scss/**/*.scss'], ['sass']);
});


/*-- for external connections --*/
var webserver = require('gulp-webserver');

gulp.task('server', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: false,
            directoryListing: {enable: true, path: './'},
            open: false,
            host: "localhost",
            fallback: 'carrentals/index.html'
        }));
});
/*-- end --*/