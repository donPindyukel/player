"use strict";

var gulp = require('gulp'),
    concatCSS = require('gulp-concat-css'),
    rename = require('gulp-rename'),
     notifyCSS = require('gulp-notify'),
     autoprefixer = require('gulp-autoprefixer'),
     livereload = require('gulp-livereload'),
     less = require('gulp-less'),
     connect = require('gulp-connect'),
     clean = require('gulp-clean'),
     uncss = require('gulp-uncss'),
     fileinclude = require('gulp-file-include'),
     concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');
   
//server connect
gulp.task('connect', function() {
   connect.server({
    root: 'source',
    livereload: true
  });
});

//less
gulp.task('less', function () {
    gulp.src('source/less/*.less')
         .pipe(less())
         .pipe(gulp.dest('source/tmp/'))
});

//clean
gulp.task('clear', function () {
   gulp.src('source/tmp/*.css', {read: false})
        .pipe(clean());
});

//uncss
gulp.task('un-css', function () {
    return gulp.src('source/tmp/*.css')
        .pipe(uncss({
            html: ['source/*.html']
        }))
        .pipe(gulp.dest('source/tmp/'));
});

//file include
gulp.task('fileinclude', function() {
  gulp.src(['*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('source/'))
    .pipe(connect.reload());
});

//concat for concat js

gulp.task('concat-js', function() {
  return gulp.src('source/js/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('source/js/'));
});

//css
gulp.task('css', ['clear'], function () {//перед css выполниться clear
  
  return   gulp.src('source/less/*.less')//собираем лес
        .pipe(less())
        .pipe(gulp.dest('source/tmp/'))//директория для лесовых цсс
        .pipe(concatCSS('style.css'))//файл в который сливаем лес цссы
        // .pipe(uncss({
           // html: ['source/*.html']//удаляем в нем неиспользуемые стили
        // }))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9','Firefox ESR', 'Opera 12.1')) //костыли   
        .pipe(gulp.dest('source/css/'))//сохраняем вес в эту директорию
        .pipe(connect.reload());//ерезагрузим сервак
});



//html
gulp.task('html', function () {
	 gulp.src('source/*.html')
	.pipe(connect.reload());
})

//watch
gulp.task('watch', function() {
	gulp.watch('source/*.css', ['css'])
	gulp.watch('source/*.html',['html'])
    gulp.watch('source/components/*.html',['fileinclude'])
    gulp.watch('*.html',['fileinclude'])
    gulp.watch('source/less/*.less', ['css'])
    gulp.watch('source/js/scripts/*.js',['concat-js']);
});

gulp.task('default', ['connect', 'html', 'css', 'watch']);

gulp.task('tasks', ['less','css','html']);
