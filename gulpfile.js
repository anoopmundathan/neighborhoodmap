var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');


//Minify HTML files and place it in dist folder
gulp.task('minifyHTML', function () {
	return gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
});

//Minify css file
gulp.task('minifyCSS', function () {
	return gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'))
});

//Minify javascript file
gulp.task('uglify', function (){
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

//Execute default tasks, i.e minify html, css & js.
gulp.task('default',['minifyHTML', 'minifyCSS','uglify']);

//Watch any change in html, css, Js files
gulp.task('watch', function () {

	gulp.watch('src/css/*.css', ['minifyCSS']);
	gulp.watch('src/js/*.js',['uglify']);
	gulp.watch('src/*.html',['minifyHTML']);

});