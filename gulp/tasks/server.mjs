import { plugins } from '../config/plugins.mjs';
import { paths } from '../config/paths.mjs';

// Локальный сервер и автоматическая перезагрузка
export function server(done) {
  plugins.server.init({
    server: {
      baseDir: paths.dest, // папка с результатом
      index: 'index.html',
    },
    notify: false, // сообщения
    // browser: 'google chrome',
    open: true,
    // port: 3000,
    browser: 'chrome',
    // browser: ["google chrome", "firefox"],
    // tunnel: true,
    // https: true,
    // host: '192.168.1.1',
    
  });
  done();
}

