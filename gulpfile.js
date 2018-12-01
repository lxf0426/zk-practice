/*
 * @Author: Lxf 
 * @Date: 2018-12-01 09:34:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-01 11:00:29
 */

var gulp = require('gulp');

var sass = require('gulp-sass');

var auto = require('gulp-autoprefixer');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var concat = require('gulp-concat');

var server = require('gulp-webserver');

var swiper = require('./src/data/swiper.json')

var fs = require('fs');

var path = require('path');

//编译scss
gulp.task('default', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('default'));
})

//起服务
gulp.task('server', function() {
    return gulp.src('src')
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
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

//开发环境
gulp.task('dev', gulp.series('default', 'server', 'watch'))