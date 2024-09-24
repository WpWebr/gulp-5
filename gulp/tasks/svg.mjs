import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError, plumberError } from './errors.mjs';

// Обработка SVG и создание спрайта
export function svgSpr(done) {

  if (setings.sprite && !plugins.fs.existsSync(paths.svg.sprite)) {

    // Создание папки src/images/sprite, если её нет
    if (!plugins.fs.existsSync(paths.svg.spriteDest)) {
      plugins.mkdir(paths.svg.spriteDest, { recursive: true });
    }

    plugins.fs.readdir(paths.svg.spriteDest, function (err, files) {
      if (err) {
        // some sort of error
        plumberError(`Ошибка в copySvgSprite`);
      } else {
        if (files.length) {
          return plugins.gulp.src(paths.svg.spriteSrc)
            .pipe(handleError('SVG'))

            .pipe(plugins.gulpIf(setings.spriteDelAtribut, plugins.cheerio({
              run: ($) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
              },
              parserOptions: { xmlMode: true }
            })))
            .pipe(plugins.replace('&gt;', '>'))
            .pipe(plugins.svgSprite({
              mode: {
                stack: {
                  sprite: `../sprite/${setings.spriteName}`, // имя файла спрайта
                  example: true // превью-инструкция
                }
              }
            }))
            .pipe(plugins.gulp.dest(paths.svg.spriteDest));
        } else {
          // directory appears to be empty
          plumberError(`Для создания спрайта поместите .svg в папку: ${paths.svg.spriteDest}. Создать спрайт: gulp svg`, 'svgSpr');
        }
      }
    });

  } else if(!setings.sprite){
    console.log(`Создания спрайта отключено. Для создания в файле gulp/config/setings.mjs установите sprite: 1`, 'svgSpr');
  }
  done();
}