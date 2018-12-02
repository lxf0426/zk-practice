/*
 * @Author: Lxf 
 * @Date: 2018-12-01 09:34:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-02 20:04:30
 */

var gulp = require('gulp');

var sass = require('gulp-sass');

var auto = require('gulp-autoprefixer');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var concat = require('gulp-concat');

var server = require('gulp-webserver');

var swiper = require('./src/data/swiper.json')

var babel = require("gulp-babel");

var fs = require('fs');

var path = require('path');

//编译scss
gulp.task('default', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('default'));
})

//起服务
gulp.task('server', function() {
    return gulp.src('build')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;

                if (req.url === '/favicon.ico') {
                    return res.end();
                }

                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 0, msg: swiper }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)))
                }
            }
        }))
})

//开发环境
gulp.task('dev', gulp.series('default', 'server', 'watch'))


//css
gulp.task("bCss", function() {
    return gulp.src('./src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./build/css'))
})

//js
gulp.task("bJs", function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
})

//copeJs
gulp.task("bCopeJs", function() {
    return gulp.src('./src/js/lib/*.js')
        .pipe(gulp.dest('./build/js/lib'))
})

//html
gulp.task("bHtml", function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build/'))
})

//线上环境
gulp.task('build', gulp.parallel('bCss', 'bJs', 'bCopeJs', 'bHtml', 'server'))