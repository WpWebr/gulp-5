import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';


// Компиляция SCSS в CSS
export function styles() {
  return plugins.gulp.src(paths.styles.src, { sourcemaps: !setings.isProduction })
    .pipe(handleError('Styles'))
    .pipe(plugins.gulpIf(!setings.isProduction, plugins.sourcemaps.init()))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.gulpIf(setings.isProduction, plugins.cleanCSS()))
    .pipe(plugins.gulpIf(!setings.isProduction, plugins.sourcemaps.write('.')))
    .pipe(plugins.gulp.dest(paths.styles.dest))
    .pipe(plugins.browserSync.stream());
}
