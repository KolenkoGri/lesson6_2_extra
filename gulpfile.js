import gulp from "gulp";
import browserSync from "browser-sync";
import gulpCssimport from "gulp-cssimport";
import {deleteAsync} from 'del';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';

const prepros = true;

const sass = gulpSass(sassPkg);

export const html = () => gulp
.src('src/**/*.html')
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream());


export const style = () => {
    if (prepros) { gulp
        .src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/scss'))
        .pipe(browserSync.stream());
    }

    return gulp
    .src('src/css/**/*.css')
    .pipe(gulpCssimport({
        extensions: ['css']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

export const js = () => gulp
.src('src/js/**/*.js')
.pipe(gulp.dest('dist/js'))
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

export const copy = () => gulp
.src([
    './src/scss/fonts/**/*',
    './src/css/**/*',
    './src/scss/**/*',
], {
    base: 'src'
})
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream({
    once: true
}));

export const server = () => {
    browserSync.init({
        ui: false,
        notify: false,
        tunnel: true,
        server: {
            baseDir: 'dist'
        } 
    })

    gulp.watch("./src/**/*.html", html);
    // gulp.watch("./src/css/**/*.css", css);
    gulp.watch(prepros ? "./src/**/*.scss" : "./src/**/*.css", style);
    gulp.watch("./src/js/**/*.js", js);
    gulp.watch(["./src/css/**/*}", './src/css/fonts/**/*' ], copy);
}

export const clear = () => deleteAsync('dist/**/*', {forse: true});

export const base = gulp.parallel(html, style, js, copy);

export const build = gulp.series(clear, base)

export default gulp.series(base,server);