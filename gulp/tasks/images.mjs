import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';

// Обработка изображений (кроме GIF) и сохранение в папку src/images
export const processImages = plugins.gulp.series(imagesDest, imagemin, webp, avif);

function avif(done) {
  if (setings.avif) {
    return plugins.gulp.src(paths.images.src, { encoding: false })
      .pipe(handleError('Images'))
      // .pipe(plugins.newer(paths.images.minDest))
      .pipe(plugins.avif())
      .pipe(plugins.gulp.dest(paths.images.minDest));
  }
  done();
}

function webp(done) {
  if (setings.webp) {
    return plugins.gulp.src(paths.images.src, { encoding: false })
      .pipe(handleError('Images'))
      // .pipe(plugins.newer(paths.images.minDest))
      .pipe(plugins.webp())
      .pipe(plugins.gulp.dest(paths.images.minDest));
  }
  done();
}

function imagemin() {
  return plugins.gulp.src(paths.images.src, { encoding: false })
    .pipe(handleError('Images'))
    .pipe(plugins.newer(paths.images.minDest))
    .pipe(plugins.gulpIf(setings.imagemin, plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(plugins.gulp.dest(paths.images.minDest));
}

// Создание папки src/images, если её нет
export function imagesDest(done) {
  if (!plugins.fs.existsSync(paths.images.minDest)) {
    plugins.mkdir(paths.images.minDest, { recursive: true });
  }
  done();
}

// Создание папок src/images и src/images/sprite, если их нет
export function createDirs(done) {
  if (!plugins.fs.existsSync(paths.images.minDest)) {
    plugins.mkdir(paths.images.minDest, { recursive: true });
  }
  if (!plugins.fs.existsSync(paths.svg.spriteDest) && setings.sprite) {
    plugins.mkdir(paths.svg.spriteDest, { recursive: true });
  }
  done();
}


