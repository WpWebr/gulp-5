import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { handleError } from './errors.mjs';

// Обработка SVG и создание спрайта
export function svgSpr() {
  return plugins.gulp.src(paths.svg.spriteSrc)
    .pipe(handleError('SVG'))
    .pipe(plugins.cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(plugins.replace('&gt;', '>'))
    .pipe(plugins.svgSprite({
      mode: {
        symbol: {
          sprite: 'sprite.svg', // Имя файла спрайта
          example: true // превью-инструкция
        }
      }
    }))
    .pipe(plugins.gulp.dest(paths.svg.spriteDest))
    .pipe(plugins.browserSync.stream());
}