import { paths } from '../config/paths.mjs'; // пути
import { plugins } from '../config/plugins.mjs'; // плагины
import { setings } from '../config/setings.mjs';

import { clean, cleanSprite } from './del.mjs'; // удаление
import { copyFiles, gifs, copySvg, copyFonsts, copyProcessedImages, copySvgSprite } from './copy.mjs'; // копирование
import { fonts, fontsStyle } from './fonts.mjs'; // шрифт
import { processImages, createDirs } from './images.mjs'; // img
import { svgSpr } from './svg.mjs'; // svg
import { html } from './html.mjs'; // html
import { styles } from './styles.mjs'; // scss
import { scripts } from './js.mjs'; // js
import { server } from './server.mjs'; // браузер
import { nevProject } from './prodject.mjs'; // новый проект
import { info } from './info.mjs'; // информация о запущенном проекте
import { addZip } from './zip.mjs'; // создание ZIP

// Отслеживание изменений и удалений
function watchFiles() {
  plugins.gulp.watch(paths.styles.watch, styles);
  plugins.gulp.watch(paths.scripts.watch, scripts);
  // Следим за добавлением изображений - обрабатываем и добавляем соответствующие файлы в dist/img и src/img_min
  plugins.gulp.watch(paths.images.src, { events: 'add' }, plugins.gulp.series(processImages, copyProcessedImages));
  plugins.gulp.watch(paths.gifs.src, gifs);
  plugins.gulp.watch(paths.files.src, copyFiles);
  // plugins.gulp.watch([paths.htmlIncludes.src, paths.html.src], html);
  plugins.gulp.watch(paths.html.watch, html);
  plugins.gulp.watch(paths.svg.src, copySvg); // Отслеживание изменений SVG файлов
  plugins.gulp.watch(paths.svg.spriteSrc, svgSpr); // Отслеживание изменений SVG для спрайта
  // Следим за папкой с обработанными изображениями
  plugins.gulp.watch(`${paths.images.minDest}/**/*.{jpg,jpeg,png,avif,webp}`)
    .on('change', (filepath) => {
      plugins.gulp.src(filepath, { encoding: false })
        .pipe(plugins.gulp.dest(paths.images.dest));
    });
  // Следим за папками и удаляем соответствующие файлы и папки в dist/ 
  plugins.gulp.watch([
    paths.styles.watch,
    paths.scripts.src,
    paths.gifs.src,
    paths.files.src,
    paths.svg.src,
    paths.html.watch
  ]).on('unlink', (filepath) => delFile(filepath));

  // При удалении изображений удаляем соответствующие файлы в dist/images и src/imagemin
  plugins.gulp.watch(paths.images.src)
    .on('unlink', (filepath) => {

      const srcImgPath = filepath.replace('images', 'aa/img_min');
      const srcMinPath = filepath.replace('images', 'aa/img');
      const srcMinWebpPath = srcMinPath.replace(/\.(jpg|jpeg|png)$/, '.webp');
      const srcMinAvifPath = srcMinPath.replace(/\.(jpg|jpeg|png)$/, '.avif');
      const destFilePath = filepath.replace(replaceSlash(paths.src), replaceSlash(paths.dest));
      const destWebpPath = destFilePath.replace(/\.(jpg|jpeg|png)$/, '.webp');
      const destAvifPath = destFilePath.replace(/\.(jpg|jpeg|png)$/, '.avif');

      plugins.deleteAsync([srcImgPath, srcMinPath, srcMinWebpPath, srcMinAvifPath, destFilePath, destWebpPath, destAvifPath])
        .then(paths => {
          console.log(`Удаленные изображения:\n${paths.join('\n')}`);
        });

    });

  // Замена '\' на '/'
  function replaceSlash(stroke) {
    return stroke.replace(/\//g, '\\');
  }

  // Удаление файлов и папок
  function delFile(filepath) {
    filepath = filepath.replace('src', setings.dest);
    if (filepath.length > 0) {
      plugins.deleteAsync(filepath).then(paths => {
        console.log(`Удаленные файлы:\n${paths.join('\n')}`);
      });
    } else {
      console.log(`Файлы не найдены:\n${paths.join('\n')}`);
    }

  }
}


// Копирование
const copyAll = plugins.gulp.parallel(
  copyFiles,
  gifs,
  copySvg,
  copyProcessedImages,
  copySvgSprite,
  copyFonsts
);
// Основные задачи
export const build = plugins.gulp.series(
  createDirs,
  plugins.gulp.parallel(styles, scripts, html),
  processImages,
  svgSpr,
  copyAll,
  info
);

// Основные задачи и наблюдение
export const dev = plugins.gulp.series(
  nevProject,
  clean, 
  build, 
  plugins.gulp.parallel(server, watchFiles),  
);

// Задача для работы со спрайтом SVG
export const svg = plugins.gulp.series(cleanSprite, svgSpr);

// Создание ZIP
export const zip = plugins.gulp.series(build, addZip);

export {
  // Шрифт 
  fonts, // конвертация и стили
  fontsStyle, // стили  без конвертации
}

export { processImages }
