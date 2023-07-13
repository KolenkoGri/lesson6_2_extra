import gulp from "gulp";
import browserSync from "browser-sync";
import gulpCssimport from "gulp-cssimport";
import { deleteAsync } from "del";
import sassPkg from "sass";
import gulpSass from "gulp-sass";
import htmlmin from "gulp-htmlmin";
import cleanCss from "gulp-clean-css";
import terser from "gulp-terser";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import GulpImage from "gulp-image";
import autoPrefixer from "gulp-autoprefixer";
import babel from "gulp-babel";

const prepros = true;

const sass = gulpSass(sassPkg);

const allJS = [
  "src/js/modules/article.js",
  "src/js/modules/page.js",
  "src/js/modules/timer.js",
];

export const html = () =>
  gulp
    .src("src/**/*.html")
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    gulp
      .src("src/scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      // .pipe(autoPrefixer())
      .pipe(
        cleanCss({
          2: {
            specialComments: 0,
          },
        })
      )
      .pipe(sourcemaps.write("../maps"))
      .pipe(gulp.dest("dist/scss"))
      .pipe(browserSync.stream());
  }

  return gulp
    .src("src/css/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(
      gulpCssimport({
        extensions: ["css"],
      })
    )
    // .pipe(autoPrefixer())
    .pipe(
      cleanCss({
        2: {
          specialComments: 0,
        },
      })
    )
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
};

export const js = () =>
  gulp
    .src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //   presets: ['@babel/preset-env'],
    //   // ignore: ['src/js/**/*.js']
    // }))
    .pipe(terser())
    // .pipe(concat("script.js"))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());

// export const copy = () => gulp
// .src([
//     'src/fonts/**/*',
//     'src/**/*.{svg}',
//     'src/**/*.{jpg}',
//     'src/**/*.{jpeg}',
//     'src/**/*.{png}',
// ], {
//     base: 'src'
// })
// .pipe(gulp.dest('dist'))
// .pipe(browserSync.stream({
//     once: true
// }));
//     gulp.watch(['src/fonts/**/*',
//     'src/**/*.{svg}',
//     'src/**/*.{jpg}',
//     'src/**/*.{jpeg}',
//     'src/**/*.{png}' ], copy);

export const img = async () => {
  gulp
    .src(
      prepros
        ? "src/scss/image/**/*.{jpeg,jpg,png,svg,gif}"
        : "src/css/image/**/*.{jpeg,jpg,png,svg,gif}"
    )
    .pipe(GulpImage({
      optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
      pngquant: ['--speed=1', '--force', 256],
      zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
      jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
      mozjpeg: ['-optimize', '-progressive'],
      gifsicle: ['--optimize'],
      svgo: true,
    }))
    .pipe(gulp.dest(prepros ? "dist/scss/image" : "dist/css/image"));
};

export const copy = () =>
  gulp
    .src("src/scss/fonts/**/*", {
      base: "src",
    })
    .pipe(gulp.dest("dist"))
    .pipe(
      browserSync.stream({
        once: true,
      })
    );

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    // tunnel: true,
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("./src/**/*.html", html);
  // gulp.watch("./src/css/**/*.css", css);
  gulp.watch(prepros ? "./src/**/*.scss" : "./src/**/*.css", style);
  gulp.watch("./src/js/**/*.js", js);
  gulp.watch(
    [prepros ? "./src/css/fonts/**/*" : "./src/scss/fonts/**/*"],
    copy
  );
};

export const clear = () => deleteAsync("dist/**/*", { forse: true });

export const base = gulp.parallel(img, html, style, js, copy);

export const build = gulp.series(clear, base);

export default gulp.task('default', server);

// export default gulp.series(base, server);

