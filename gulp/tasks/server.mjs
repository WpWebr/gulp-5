import { plugins } from '../config/plugins.mjs';
import { paths } from '../config/paths.mjs';

// Локальный сервер
export function server(done) {
  plugins.server.init({
    server: {
      baseDir: paths.dest, // папка с результатом
      // index: 'index.html',
    },
    notify: false, // сообщения
    open: false,
    // port: 3000,
    browser: 'chrome',    
  });
  done();
}

