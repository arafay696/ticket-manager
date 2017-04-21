var gulp = require('gulp'),
    uglify = require('gulp-uglify');
jshint = require('gulp-jshint');
concat = require('gulp-concat');
debug = require('gulp-debug');
fixmyjs = require("gulp-fixmyjs");
cleanCSS = require('gulp-clean-css');

const ENVIRONMENT = 'development';

// All bower components, Angular Library to Minify/Compile
var componentsJsList = [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-filter/dist/angular-filter.min.js',
    'bower_components/angularjs-datepicker/dist/angular-datepicker.js',
    'bower_components/angular-input-masks/angular-input-masks-standalone.min.js',
    'bower_components/angularUtils-pagination/dirPagination.js'
];

if (ENVIRONMENT !== 'development') {
    componentsJsList.push(
        'angular/js/application.js',
        'angular/js/controller.js',
        'angular/js/directive.js',
        'angular/js/services.js',
        'angular/js/filters.js'
    );
}

// All CSS files to Minify/Compile
var cssList = [
    'assets/client/css/bootstrap.min.css',
    'assets/client/css/business-casual.css', // Custom CSS
    'assets/client/css/page_animation.css',
    'assets/client/css/font-awesome/css/font-awesome-for-gulp.css'
];

// Task components: to complie list of JS files
gulp.task('components', function () {
    return gulp.src(componentsJsList)
        .pipe(debug())
        .pipe(uglify())
        .pipe(fixmyjs({
            asi: false
        }))
        .pipe(concat('components.js'))
        .pipe(gulp.dest('build/js'));
});

// Task css: to complite list of CSS files
gulp.task('css', function () {
    return gulp.src(cssList)
        .pipe(jshint())
        .pipe(debug())
        .pipe(cleanCSS())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('assets/client/css'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(cssList, ['css']);
    gulp.watch(componentsJsList, ['components']);
});

// Will run this task, if no task provide
gulp.task('default', ['components', 'css', 'watch']);