import { plugins } from '../config/plugins.mjs';
import { paths } from '../config/paths.mjs';

// Локальный сервер и автоматическая перезагрузка
export function serve(done) {
  plugins.browserSync.init({
    server: {
      baseDir: paths.dest
    }
  });
  done();
}

