import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';

// Обработка изображений (кроме GIF) и сохранение в папку src/images
export const processImages = plugins.gulp.series(imagesDest, imagemin, webp, avif);

// Создание папок src/img и src/img/img_min, если их нет
export function imagesDest(done) {
  if (!plugins.fs.existsSync(paths.images.minDest)) {
    plugins.mkdir(paths.images.minDest, { recursive: true });
  }
  if (!plugins.fs.existsSync(paths.images.imgMin)) {
    plugins.mkdir(paths.images.imgMin, { recursive: true });
  }
  done();
}

// Сжимаем
function imagemin() {
  return plugins.gulp.src(paths.images.src, { encoding: false })
    .pipe(handleError('Images'))
    .pipe(plugins.newer(paths.images.imgMin))
    .pipe(plugins.gulpIf(setings.imagemin, plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(plugins.gulp.dest(paths.images.imgMin));
}
// Создаём .webp
function webp(done) {
  if (setings.webp) {
    return plugins.gulp.src(paths.images.imgMinSrc, { encoding: false })
      .pipe(handleError('Images'))
      .pipe(plugins.newer(paths.images.minDest))
      .pipe(plugins.webp())
      .pipe(plugins.gulp.dest(paths.images.minDest));
  }
  done();
}
// Создаём .avif
function avif(done) {
  if (setings.avif) {
    return plugins.gulp.src(paths.images.imgMinSrc, { encoding: false })
      .pipe(handleError('Images'))
      .pipe(plugins.newer(paths.images.minDest))
      .pipe(plugins.avif())
      .pipe(plugins.gulp.dest(paths.images.minDest));
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