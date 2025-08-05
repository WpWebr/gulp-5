import { plugins } from '../config/plugins.mjs';

// Копирование файлов без изменений (files)
export function copyFiles() {
  return add.plugins.gulp.src(add.paths.files.src, { encoding: false })
    .pipe(add.handleError('Files'))
    .pipe(add.plugins.gulp.dest(add.paths.files.dest));
}

// Копирование файлов без изменений (inc)
export function copyInc() {
  return add.plugins.gulp.src(add.paths.inc.src, { encoding: false })
    .pipe(add.handleError('Inc'))
    .pipe(add.plugins.gulp.dest(add.paths.inc.dest));
}

// Копирование robots.txt
export function copyRobots() {
  return add.plugins.gulp.src(add.paths.robots.src)
    .pipe(add.handleError('copyRobots'))
    .pipe(add.plugins.gulp.dest(add.paths.dest));
}

// Копирование GIF-файлов без изменений
export function gifs() {
  return add.plugins.gulp.src(add.paths.gifs.src, { encoding: false })
    .pipe(add.handleError('GIFs'))
    .pipe(add.plugins.gulp.dest(add.paths.gifs.dest));
}

// Копирование SVG-файлов без изменений
export function copySvg(done) {
  const svgFiles = add.paths.svg.src;
  if (add.plugins.fs.existsSync(add.paths.svg.srcFolder)) {
    return add.plugins.gulp.src(svgFiles, { encoding: false })
      .pipe(add.handleError('CopySvg'))
      .pipe(add.plugins.gulp.dest(add.paths.svg.dest));
  } else {
    add.plumberError(`Папка ${add.paths.svg.srcFolder} не найдена`);
  }
  done();
}

// Копируем шрифты
export function copyFonsts() {
  // ищем файлы шрифтов .woff и .woff2
  return add.plugins.gulp.src(`${add.paths.fonts.src_woff}/*{.woff,.woff2}`, { encoding: false })
    .pipe(add.plugins.newer(add.paths.fonts.dest))
    // выгружаем в папку с результатом
    .pipe(add.plugins.gulp.dest(add.paths.fonts.dest));
}

// Копирование обработанных изображений из src/img и src/img_min в dist/images
export const copyProcessedImages = plugins.gulp.series(copyImg, copyImgMin);

// export const copyProcessedImages = (() => {
//   return add.plugins.gulp.series(copyImg, copyImgMin);
// })();

// export async function copyProcessedImages(){
//   return add.plugins.gulp.series(copyImg, copyImgMin);
// }

// export function copyProcessedImages(){
//   return add.plugins.gulp.src(add.paths.images.srcDest, { encoding: false })
//     .pipe(add.handleError('CopyProcessedImages'))
//     .pipe(add.plugins.newer(add.paths.images.dest))
//     .pipe(add.plugins.gulp.dest(add.paths.images.dest))
//     .pipe(add.plugins.gulp.src(add.paths.images.imgMinSrc, { encoding: false }))
//     .pipe(add.handleError('CopyProcessedImages'))
//     .pipe(add.plugins.newer(add.paths.images.dest))
//     .pipe(add.plugins.gulp.dest(add.paths.images.dest));
// }

function copyImg() {
  return add.plugins.gulp.src(add.paths.images.srcDest, { encoding: false })
    .pipe(add.handleError('CopyProcessedImages'))
    .pipe(add.plugins.newer(add.paths.images.dest))
    .pipe(add.plugins.gulp.dest(add.paths.images.dest));
}
function copyImgMin() {
  return add.plugins.gulp.src(add.paths.images.imgMinSrc, { encoding: false })
    .pipe(add.handleError('CopyProcessedImages'))
    .pipe(add.plugins.newer(add.paths.images.dest))
    .pipe(add.plugins.gulp.dest(add.paths.images.dest));
}

// Копирование спрайта в dist
export function copySvgSprite(done) {

  if (add.setings.sprite) {
    // Создание папки src/images/sprite, если её нет
    if (!add.plugins.fs.existsSync(add.paths.svg.spriteDest)) {
      add.plugins.mkdir(add.paths.svg.spriteDest, { recursive: true });
    }

    const spriteFile = add.paths.svg.sprite;

    if (add.plugins.fs.existsSync(spriteFile)) {
      return add.plugins.gulp.src(spriteFile, { encoding: false })
        .pipe(add.handleError('CopySvgSprite'))
        .pipe(add.plugins.gulp.dest(add.paths.svg.destSprite));
    }
    // else {
    //   add.plumberError(`Для создания спрайта поместите .svg в папку: ${add.paths.svg.spriteDest}. Создать спрайт: gulp svg`, 'copySvgSprite');
    // }
  } else {
    console.log(`Создание спрайта отключено в файле ${add.paths.setings} (sprite: 0)`, 'copySvgSprite');
  }
  done();
}


