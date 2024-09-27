import { paths } from '../config/paths.mjs';
import { setings } from '../config/setings.mjs';
import { plugins } from '../config/plugins.mjs';
import { handleError } from './errors.mjs';

// Минификация и объединение JS файлов
export function scripts() {

  const sourcemaps = !(setings.isBuild || setings.ayBuil);

  return plugins.gulp.src(paths.scripts.src, { sourcemaps })
    .pipe(handleError('Scripts'))
    .pipe(plugins.webpack({
      mode: sourcemaps ? 'development' : 'production',
      output: {
        filename: 'app.min.js',
      }
    }))

    // .pipe(plugins.gulpIf(!setings.isBuild, plugins.sourcemaps.init()))
    // .pipe(plugins.concat('app.min.js'))
    // .pipe(plugins.gulpIf(setings.isBuild, plugins.uglify()))
    // .pipe(plugins.gulpIf(!setings.isBuild, plugins.sourcemaps.write('.')))

    .pipe(plugins.gulp.dest(paths.scripts.dest, { sourcemaps: sourcemaps }))
    .pipe(plugins.server.stream());


}
