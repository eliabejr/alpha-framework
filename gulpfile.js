const gulp          = require("gulp");
const pug           = require("gulp-pug");
const sass          = require("gulp-sass");
const notify        = require("gulp-notify");
const cssmin        = require("gulp-clean-css");
const browserSync   = require('browser-sync').create();

//////////////////////

var files = [
  'source/html/**/*.pug',
  'source/scss/**/*.scss',
  'source/js/*.js'
];


var options = {
  server: "build/"
};

///////////////////////


// Compile PugJs Files
gulp.task("compile-html", function(){
  gulp.src("source/html/*.pug")
    .pipe(pug())
    .on("error", notify.onError({title:"Erro at compile HTML", message:"<%= error.message %>"}))
    .pipe(gulp.dest("build"));
  });


// Compile SASS Files
gulp.task("compile-sass", function () {
	return gulp.src("source/scss/style.scss")
			.pipe(sass())
			.on("error", notify.onError({title:"Error at compile CSS", message:"<%= error.message %>"}))
			.pipe(gulp.dest("source/css"))
            .pipe(browserSync.stream());
});


// Copy new fonts to the BUILD
gulp.task("copy-fonts", function() {
    gulp.src(["source/scss/modules/font-awesome/fonts/*","source/fonts/*"])
        .on("error", notify.onError({title:"Error at Copy Fonts", message:"<%= error.message %>"}))
        .pipe(gulp.dest("build/css/fonts"));
});


// Minify CSS Files
gulp.task("minify-css", function(){
  return gulp.src("source/css/style.css")
    		.pipe(cssmin({compatibility: "ie8"}))
            .on("error", notify.onError({title:"Error at minify CSS", message:"<%= error.message %>"}))
   			.pipe(gulp.dest("build/css"));
});


// Minify Js
gulp.task("compile-js", function() {
    gulp.src("source/js/*")
        .on("error", notify.onError({title:"Error at Compile Javascript", message:"<%= error.message %>"}))
        .pipe(gulp.dest("build/js"));
});

// Build Project
gulp.task("prod", function () {
    gulp.src(["build/**/*"])
        .on("error", notify.onError({ title: "Error at Copy Build Files", message: "<%= error.message %>" }))
        .pipe(gulp.dest("public/"));
});

gulp.task("watch", function() {
    gulp.watch("source/html/**/*",      ["compile-html"]);
    gulp.watch("source/scss/**/*",      ["compile-sass"]);
    gulp.watch("source/fonts/*",        ["copy-fonts"]);
    gulp.watch("source/css/style.css",  ["minify-css"]);
    gulp.watch("source/js/*",           ["compile-js"]);
});

// Browser reloading
gulp.task('server', ['compile-sass'], function() {

    browserSync.init(files, options)
    gulp.watch("src/js/*.js", ['compile-js']);
    gulp.watch(files).on('change', browserSync.reload);
});

gulp.task("default",["compile-html","compile-sass","copy-fonts","minify-css","compile-js","watch","server"]);