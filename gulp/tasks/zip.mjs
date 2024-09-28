import { paths } from '../config/paths.mjs';
import { setings } from '../config/setings.mjs';
import { plugins } from '../config/plugins.mjs';
// import del from 'del';
import { handleError } from './errors.mjs';

// Создание ZIP
export function addZip() {
  plugins.deleteAsync(`${setings.allprojects}/${setings.name}.zip`);

  return plugins.gulp.src(`${paths.dest}/**/*.*`, { encoding: false })
    .pipe(handleError('ZIP'))
    .pipe(plugins.zip(`${setings.name}.zip`))
    .pipe(plugins.gulp.dest(`${setings.allprojects}/${setings.name}`))
}
