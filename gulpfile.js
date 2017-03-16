const gulp          = require("gulp");
const sass          = require("gulp-sass");
const notify        = require("gulp-notify");
const cssmin        = require("gulp-clean-css");

gulp.task('sass', function () {
	return gulp.src("source/scss/**/*")
			.pipe(sass())
			.on("error", notify.onError({title:"Erro ao compilar CSS", message:"<%= error.message %>"}))
			.pipe(gulp.dest("./source/css"))
});

gulp.task('min-css', function(){
  return gulp.src('source/css/**/*')
    		.pipe(cssmin({compatibility: 'ie8'}))
   			.pipe(gulp.dest('./build/css'));
});


gulp.task('watch', function() {
    gulp.watch('source/scss/**/*.scss', ['sass']);
    gulp.watch('source/css/**/*.css', ['min-css']);
});

gulp.task('default',['sass','min-css','watch']);