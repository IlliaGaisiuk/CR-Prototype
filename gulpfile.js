var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task('sass', function () {
    return gulp.src('Prototype/scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('Prototype/css'));
});

gulp.task('default', ['sass', 'server']);

gulp.task('watcher', ['sass', 'server'], function () {
    gulp.watch(['scss/**/*.scss'], ['sass']);
});


/*-- for external connections --*/
var webserver = require('gulp-webserver');
var directory = "./";

gulp.task('server', function () {
    gulp.src(directory)
        .pipe(webserver({
            directoryListing: {enable: true, path: directory},
            open: false,
            port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
            host: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
            fallback: 'index.html'
        }));
});
/*-- end --*/