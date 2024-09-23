import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';

// Обёртка group-css-media-queries (cssMediaQueries) 
// через through2, чтобы можно было использовать в .pipe()
function cssMedia() {
  return plugins.through2.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      let css = file.contents.toString(enc);  // Получаем содержимое файла
      let processedCss = plugins.cssMediaQueries(css);     // Обрабатываем CSS
      file.contents = Buffer.from(processedCss);  // Записываем результат обратно
    }
    cb(null, file);  // Передаём файл дальше в поток
  });
}


export function styles() {
  return plugins.gulp.src(paths.styles.src, { sourcemaps: !setings.isProduction })
    .pipe(handleError('Styles'))
    // .pipe(plugins.gulpIf(!setings.isProduction, plugins.sourcemaps.init()))
    .pipe(plugins.sass({ // Компиляция SCSS в CSS
      outputStyle: 'expanded'
    }))
    .pipe(plugins.replace(/@img\//g, '../images/'))
    // Поддержка .webp для CSS
    .pipe(plugins.gulpIf(setings.webpCSS, plugins.webpcss({
      webpClass: '.webp', // класс при поддержке .webp
      // noWebpClass: '.no-webp' // класс если .webp не поддерживается
    })))
    .pipe(plugins.autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 3 versions'],
      cascade: true
    }))
    .pipe(cssMedia())// групировка медиа запросов
    .pipe(plugins.gulpIf(setings.noCleanCSSfile, plugins.gulp.dest(paths.styles.dest)))
    .pipe(plugins.cleanCSS()) // сжатие
    .pipe(plugins.rename({
      extname: '.min.css'
    }))
    .pipe(plugins.gulp.dest(paths.styles.dest))
    .pipe(plugins.browserSync.stream());
} 
