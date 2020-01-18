// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
const isChanged = require("gulp-changed");
const minifyImg = require("gulp-imagemin");
const minifyImg_JPG = require("imagemin-jpeg-recompress");
const minifyImg_PNG = require("imagemin-pngquant");
const minifyImg_GIF = require("imagemin-gifsicle");


// style.scssの監視タスクを作成する
gulp.task("default", function() {
  // ★ style.scssファイルを監視
  return gulp.watch("./src/scss/style.scss", function() {
    // style.scssの更新があった場合の処理

    // style.scssファイルを取得
    return (
      gulp
        .src("./src/scss/style.scss")
        // Sassのコンパイルを実行
        .pipe(
          sass({
            outputStyle: "expanded"
          })
            // sassエラー表示(これがないと自動的に止まってしまう)
            .on("error", sass.logError)
        )
        // cssフォルダー以下に保存
        .pipe(gulp.dest("./src/css"))
    );
  });
});

// 画像圧縮
// https://memorandums.3ki3ki.com/gulp-image/
gulp.task('minify-img', function(done) {
  gulp.src("src/images/*.+(jpg|jpeg|png|gif)") //src部分は適宜環境に合わせて修正
      .pipe(isChanged("./src/images/dist"))
      .pipe(minifyImg([minifyImg_JPG(),minifyImg_PNG(),minifyImg_GIF()]))
      .pipe(gulp.dest("./src/images/dist"));
  done();
});
gulp.task('default', gulp.series('minify-img'));
gulp.watch(['./src/*.*'], gulp.task('minify-img')); //src部分は適宜環境に合わせて修正

