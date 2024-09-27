import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';

const picture = setings.avif || setings.webp;
let pictureSource = [];
if (setings.avif && setings.webp) {
  pictureSource = ['.avif', '.webp'];
} else if (setings.avif) {
  pictureSource = ['.avif'];
} else {
  pictureSource = ['.webp'];
}



export function html() {
  return plugins.gulp.src(paths.html.src)
    .pipe(handleError('HTML'))
    .pipe(plugins.fileInclude()) // собираем HTML
    .pipe(plugins.replace(/@img\//g, './images/'))

    // Добавляем <picture>
    .pipe(plugins.gulpIf(picture, plugins.htmlmin({ collapseWhitespace: true }))) // сжимаем
    .pipe(plugins.gulpIf(picture, plugins.pictureHTML( // добавляем <picture>
      // options:
      {
        extensions: setings.extensions,  // для каких файлов создаем 'picture'
        source: pictureSource,  // создаем 'source' с этими форматами      
        noPicture: setings.noPicture,   // если находим этот класс для тега 'img', то не создаем 'picture' (можно ставить несколько классов)
        noPictureDel: setings.noPictureDel // удалять классы прописанные в `noPicture`?
      }
    )))
    .pipe(plugins.gulpIf(picture, plugins.formatHtml())) // "разжимаем" (форматируем)
    // END Добавляем <picture>
    
    .pipe(plugins.gulpIf(setings.isBild, plugins.versionNumber({ // версия файлов
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ]
      },
      'output': {
        'file': 'gulp/version.json'
      }
    }
    )))
    // Cжимаем
    .pipe(plugins.gulpIf(setings.collapseHTML, plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true, // удалить коменты
    })))
    // END Cжимаем

    .pipe(plugins.gulp.dest(paths.html.dest))
    .pipe(plugins.server.stream());
}


