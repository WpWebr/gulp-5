import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { handleError } from './errors.mjs';

// Обработка изображений (кроме GIF) и сохранение в папку src/imagemin
export async function processImages() {

  // Создание папки src/imagemin, если её нет
  // await createDirs();
  if (!plugins.fs.existsSync(paths.images.minDest)) {
    plugins.mkdir(paths.images.minDest, { recursive: true });
  }


  return plugins.gulp.src(paths.images.src, { encoding: false })
    .pipe(handleError('Images'))
    .pipe(plugins.newer(paths.images.minDest))
    .pipe(plugins.avif())
    .pipe(plugins.gulp.dest(paths.images.minDest))
    .pipe(plugins.gulp.src(paths.images.src, { encoding: false }))
    .pipe(plugins.newer(paths.images.minDest))
    .pipe(plugins.webp())
    .pipe(plugins.gulp.dest(paths.images.minDest))
    .pipe(plugins.gulp.src(paths.images.src, { encoding: false }))
    .pipe(plugins.newer(paths.images.minDest))
    .pipe(plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(plugins.gulp.dest(paths.images.minDest));
  // .pipe(plugins.gulp.src(paths.images.minDest, { encoding: false }))
  // .pipe(plugins.newer(paths.images.dest))
  // .pipe(plugins.gulp.dest(paths.images.dest));
}

// Создание папок src/imagemin и src/images/sprite, если их нет
export async function createDirs() {
  if (!plugins.fs.existsSync(paths.images.minDest)) {
    await plugins.mkdir(paths.images.minDest, { recursive: true });
  }
  if (!plugins.fs.existsSync(paths.svg.spriteDest)) {
    await plugins.mkdir(paths.svg.spriteDest, { recursive: true });
  }
}