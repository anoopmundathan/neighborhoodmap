var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

gulp.task('minifyHTML', function () {
	return gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
})

gulp.task('minifyCSS', function () {
	return gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'))
})

gulp.task('uglify', function (){
	return gulp.src('src/js/*')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})

gulp.task('default',['minifyHTML', 'minifyCSS','uglify']);