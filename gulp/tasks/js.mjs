import { paths } from '../config/paths.mjs';
import { setings } from '../config/setings.mjs';
import { plugins } from '../config/plugins.mjs';
import { handleError } from './errors.mjs';

// Минификация и объединение JS файлов
export function scripts() {
  return plugins.gulp.src(paths.scripts.src, { sourcemaps: !setings.isProduction })
    .pipe(handleError('Scripts'))
    .pipe(plugins.webpack({
      mode: 'development',
      output: {
        filename: 'app.min.js',
      }
    }))

    // .pipe(plugins.gulpIf(!setings.isProduction, plugins.sourcemaps.init()))
    // .pipe(plugins.concat('app.min.js'))
    // .pipe(plugins.gulpIf(setings.isProduction, plugins.uglify()))
    // .pipe(plugins.gulpIf(!setings.isProduction, plugins.sourcemaps.write('.')))

    .pipe(plugins.gulp.dest(paths.scripts.dest))
    .pipe(plugins.browserSync.stream());
}
 