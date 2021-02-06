const gulp = require("gulp");
const image = require("gulp-image");
const sass = require("gulp-sass");

gulp.task("message", async function () {
  return console.log("Gulp is running...");
});
//copy all html files
gulp.task("copyHtml", async function () {
  gulp.src("app/index.html").pipe(gulp.dest("dist"));
});
//optimize images
gulp.task("image", async function () {
  gulp.src("app/images/*").pipe(image()).pipe(gulp.dest("dist/images"));
});
//Compile Sass
gulp.task("sass", async function () {
  gulp
    .src("app/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});
gulp.task("copyfonts", async function () {
  return gulp.src("app/fonts/*").pipe(gulp.dest("dist/fonts/"));
});
gulp.task(
  "default",
  gulp.series("message", "copyHtml", "image", "sass", "copyfonts")
);
gulp.task("watch", async function () {
  gulp.watch("app/images/*", gulp.series("image"));
  gulp.watch("app/scss/*.scss", gulp.series("sass"));
  gulp.watch("app/*.html", gulp.series("copyHtml"));
  gulp.watch("app/fonts/*", gulp.series("copyfonts"));
});
