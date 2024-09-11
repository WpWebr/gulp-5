import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';

// Создание нового проекта из исходников 
export function nevProject(done) {
  if (!plugins.fs.existsSync(paths.prodject)) {
    return plugins.gulp.src(`${paths.allProdjects}/${setings.sources}/**/*`, { encoding: false })
      .pipe(handleError('nevProject'))
      .pipe(plugins.gulp.dest(paths.src));
  } else {
    done();
  }
}


