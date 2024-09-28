import { paths } from '../config/paths.mjs';
import { setings } from '../config/setings.mjs';
import { plugins } from '../config/plugins.mjs';
import { handleError } from './errors.mjs';

// Обработка JS файлов
export function scripts() {

  const sourcemaps = !(setings.isBuild || setings.ayBuild);

  return plugins.gulp.src(paths.scripts.src, { sourcemaps })
    .pipe(handleError('Scripts'))
    .pipe(plugins.webpack({
      mode: sourcemaps ? 'development' : 'production',
      output: {
        filename: 'app.min.js',
      }
    }))
    .pipe(plugins.gulp.dest(paths.scripts.dest, { sourcemaps: sourcemaps }))
    .pipe(plugins.server.stream());
}
