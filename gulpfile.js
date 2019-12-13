const gulp          = require('gulp');
const vfs           = require('vinyl-fs');
const browserSync   = require('browser-sync').create();
const notify        = require("gulp-notify");
const plumber       = require('gulp-plumber');
const debug         = require('gulp-debug');
const sass          = require('gulp-sass');
const sourcemap     = require('gulp-sourcemaps');
const newer         = require('gulp-newer');
const del           = require('del');
sass.compiler       = require('node-sass');
// Compile SASS file

const html = function () {
    return vfs.src('./frontend/*.html')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(newer('build'))
        .pipe(gulp.dest('./build/'))
        .pipe(debug({ title: '----HTML : ' }));
}

const scss = function (done) {
     vfs.src('./frontend/css/*.scss')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(newer('./build/css'))
        .pipe(sourcemap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemap.write())
        .pipe(debug({ title: '----SCSS : ' }))
        .pipe(gulp.dest('./build/css'));
    done();
}

const images = function () {
    return vfs.src('./frontend/images/**/*.*')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(newer('./build/images'))
        .pipe(gulp.dest('./build/images'))
        .pipe(debug({ title: '----IMAGES : ' }));
}

const js = function () {
    return vfs.src('./frontend/js/**/*.*')
        .pipe(plumber({ errorHandler: notify.onError() }))
        .pipe(newer('./build/js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(debug({ title: '----IMAGES : ' }));
}

const browser = function (done) {
    browserSync.init({
        server: {
            baseDir: "./build/",
        }
    });
    done();
}

const refresh = function (done) {
    browserSync.reload();
    done();
}

const watchTimeOut = () =>  gulp.series(html, scss, images,js, refresh);
const watch = function () {
    gulp.watch('./frontend/**/*.*', (done) => {
        setTimeout(watchTimeOut(), 200);
        done();
    });
}

const dell = function (done) {
    del('./build').then(paths => console.log('---- DELETED FILES: ', paths.join('\n')));
    done();
}

exports.build   = gulp.series(html, scss, images,js);
exports.dell    = dell;
exports.develop = gulp.parallel(browser, watch);


/**
 * Cataloges:
 * 
 * __ frontenf
 *  |--- css
 *  |  |--- imports
 *  |  |  |___ _reset.scss
 *  |  |  |___ _typography.scss
 *  |  |
 *  |  |___ style.scss
 *  | 
 *  |--- images
 *  |
 *  |--- js      
 *  |
 *  |___ index.html
 * 
 */