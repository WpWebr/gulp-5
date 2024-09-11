import { paths } from '../config/paths.mjs'; // пути
import { plugins } from '../config/plugins.mjs'; // плагины

import { clean } from './del.mjs'; // удаление
import { copyFiles, gifs, copySvg, copyFonsts, copyProcessedImages, copySvgSprite } from './copy.mjs'; // копирование
import { fonts, fontsStyle } from './fonts.mjs'; // шрифт
import { processImages, createDirs } from './images.mjs'; // img
import { svgSpr } from './svg.mjs'; // svg
import { html } from './html.mjs'; // html
import { styles } from './styles.mjs'; // scss
import { scripts } from './js.mjs'; // js
import { serve } from './serve.mjs'; // браузер
import { nevProject } from './prodject.mjs'; // новый проект
// import { watchFiles } from './watch.mjs'; // наблюдение
// import { watchFiles } from './tasks.mjs'; // наблюдение

// Отслеживание изменений и удалений
function watchFiles() {
  plugins.gulp.watch(paths.styles.src, styles);
  plugins.gulp.watch(paths.scripts.src, scripts);
  // Следим за добавлением изображений - обрабатываем и добавляем соответствующие файлы в dist/images и src/imagemin
  // plugins.gulp.watch(paths.images.src, { events: 'add' }, plugins.gulp.series(processImages, copyProcessedImages));
  plugins.gulp.watch(paths.images.src, { events: 'add' }, plugins.gulp.series(processImages, copyProcessedImages));
  plugins.gulp.watch(paths.gifs.src, gifs);
  plugins.gulp.watch(paths.files.src, copyFiles);
  plugins.gulp.watch([paths.htmlIncludes.src, paths.html.src], html);
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
    paths.styles.src,
    paths.scripts.src,
    paths.gifs.src,
    paths.files.src,
    paths.svg.src,
    paths.html.src
  ]).on('unlink', (filepath) => delFile(filepath));

  // При удалении изображений удаляем соответствующие файлы в dist/images и src/imagemin
  plugins.gulp.watch(paths.images.src)
    .on('unlink', (filepath) => {

      const srcMinPath = filepath.replace('img', 'images');
      const srcMinWebpPath = srcMinPath.replace(/\.(jpg|jpeg|png)$/, '.webp');
      const srcMinAvifPath = srcMinPath.replace(/\.(jpg|jpeg|png)$/, '.avif');
      const filePathFromSrc = srcMinPath.replace(/src[\\/]/, '');
      const destFilePath = plugins.path.join(paths.dest, filePathFromSrc);
      const destWebpPath = destFilePath.replace(/\.(jpg|jpeg|png)$/, '.webp');
      const destAvifPath = destFilePath.replace(/\.(jpg|jpeg|png)$/, '.avif');

      plugins.deleteAsync([srcMinPath, srcMinWebpPath, srcMinAvifPath, destFilePath, destWebpPath, destAvifPath])
        .then(paths => {
          console.log(`Удаленные файлы:\n${paths.join('\n')}`);
        });


      // const filePathFromSrc = filepath.replace(/src[\\/]/, '');
      // console.log(filePathFromSrc);
      // const destFilePath = plugins.path.join(paths.dest, filePathFromSrc);
      // const destWebpPath = destFilePath.replace(/\.(jpg|jpeg|png)$/, '.webp');
      // const destAvifPath = destFilePath.replace(/\.(jpg|jpeg|png)$/, '.avif');
      // const srcMinPath = filepath.replace('img', 'images');
      // const srcMinWebpPath = srcMinPath.replace(/\.(jpg|jpeg|png)$/, '.webp');
      // const srcMinAvifPath = srcMinPath.replace(/\.(jpg|jpeg|png)$/, '.avif');
      // plugins.deleteAsync([srcMinPath, srcMinWebpPath, srcMinAvifPath, destFilePath, destWebpPath, destAvifPath])
      //   .then(paths => {
      //     console.log(`Удаленные файлы:\n${paths.join('\n')}`);
      //   });


    });

  // Удаление файлов и папок
  function delFile(filepath) {
    filepath = filepath.replace('src', paths.dest);
    plugins.deleteAsync(filepath).then(paths => {
      console.log(`Удаленные файлы:\n${paths.join('\n')}`);
    });
  }
}


// Копирование без обработки
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
  nevProject,
  clean,
  createDirs,
  plugins.gulp.parallel(styles, scripts, processImages, html),
  copyAll
);

// Основные задачи и наблюдение
export const dev = plugins.gulp.series(build, plugins.gulp.parallel(watchFiles, serve));

// Отдельная задача для работы со спрайтом SVG
export const svg = svgSpr;

// Шрифт 
export { fonts } // конвертация и стили
export { fontsStyle } // стили без конвертации
export { nevProject } // стили без конвертации
