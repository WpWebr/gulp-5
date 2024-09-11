import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError, plumberError } from './errors.mjs';


// Копирование файлов без изменений
export function copyFiles() {
  return plugins.gulp.src(paths.files.src, { encoding: false })
    .pipe(handleError('Files'))
    .pipe(plugins.gulp.dest(paths.files.dest));
}

// Копирование GIF-файлов без изменений
export function gifs() {
  return plugins.gulp.src(paths.gifs.src, { encoding: false })
    .pipe(handleError('GIFs'))
    .pipe(plugins.gulp.dest(paths.gifs.dest));
}

// Копирование SVG-файлов без изменений
export async function copySvg() {
  const svgFiles = paths.svg.src;
  if (plugins.fs.existsSync(paths.svg.srcFolder)) {
    return plugins.gulp.src(svgFiles, { encoding: false })
      .pipe(handleError('CopySvg'))
      .pipe(plugins.gulp.dest(paths.svg.dest));
  } else {
    plumberError(`Папка ${paths.svg.srcFolder} не найдена`);
  }
}

// Копируем шрифты
export function copyFonsts() {
  // ищем файлы шрифтов .woff и .woff2
  return plugins.gulp.src(`${paths.fonts.src_woff}/*{.woff,.woff2}`, { encoding: false })
    .pipe(plugins.newer(paths.fonts.dest))
    // выгружаем в папку с результатом
    .pipe(plugins.gulp.dest(paths.fonts.dest));
}

// Копирование обработанных изображений из src/imagemin в dist/images
export function copyProcessedImages() {
  return plugins.gulp.src(`${paths.images.minDest}/**/*.{jpg,jpeg,png,avif,webp}`, { encoding: false })
    // .pipe(handleError('CopyProcessedImages'))
    .pipe(plugins.newer(paths.images.dest))
    .pipe(plugins.gulp.dest(paths.images.dest));
}

// Копирование спрайта в dist
export async function copySvgSprite() {

  if (setings.sprite) {
    // Создание папки src/images/sprite, если её нет
    if (!plugins.fs.existsSync(paths.svg.spriteDest)) {
      plugins.mkdir(paths.svg.spriteDest, { recursive: true });
    }

    const spriteFile = `${paths.svg.spriteDest}/sprite/${setings.spriteName}`;

    if (plugins.fs.existsSync(spriteFile)) {
      return plugins.gulp.src(spriteFile, { encoding: false })
        .pipe(handleError('CopySvgSprite'))
        .pipe(plugins.gulp.dest(paths.svg.destSprite));
    } else {
      plumberError(`Спрайт не найден. Для создания поместите .svg в папку: ${paths.svg.spriteDest}. Создать спрайт: gulp svg`);
    }
  } else {
    console.log(`Создание спрайта отключено в файле gulp/config/setings.mjs (sprite: 0)`);
  }

}


