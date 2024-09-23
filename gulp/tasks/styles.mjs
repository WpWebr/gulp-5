import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';


// Компиляция SCSS в CSS
export function styles() {
  return plugins.gulp.src(paths.styles.src, { sourcemaps: !setings.isProduction })
    .pipe(handleError('Styles'))
    // .pipe(plugins.replace(/@img\//g, '../images/')) // ???
    // .pipe(plugins.gulpIf(!setings.isProduction, plugins.sourcemaps.init()))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    // .pipe(plugins.sass({
    //   outputStyle: 'expanded'
    // }))
    // .pipe(plugins.cssMediaQueries())// ???

    // поддержка .webp для CSS
    .pipe(plugins.gulpIf(setings.webpCSS, plugins.webpcss({
      webpClass: '.webp',
      // noWebpClass: '.no-webp'
    })))
    .pipe(plugins.autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 3 versions'],
      cascade: true
    }))
    .pipe(plugins.gulp.dest(paths.styles.dest))
    .pipe(plugins.cleanCSS())

    // .pipe(plugins.gulpIf(setings.isProduction, plugins.cleanCSS()))
    // .pipe(plugins.gulpIf(!setings.isProduction, plugins.sourcemaps.write('.')))

    .pipe(plugins.rename({
      extname: '.min.css'
    }))
    .pipe(plugins.gulp.dest(paths.styles.dest))
    .pipe(plugins.browserSync.stream());
} 
