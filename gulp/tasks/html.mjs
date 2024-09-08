import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { handleError } from './errors.mjs';

// Сборка HTML с использованием gulp-cheerio
export function html() {
  return plugins.gulp.src(paths.html.src)
    .pipe(handleError('HTML'))
    .pipe(plugins.cheerio({
      run: function ($) {
        $('img').each(function () {
          const img = $(this);
          const src = img.attr('src');
          const alt = img.attr('alt');
          const ext = plugins.path.extname(src);

          if (ext !== '.gif') {
            const picture = `
<picture>
    <source srcset="${src.replace(/\.\w+$/, '.avif')}" type="image/avif">
    <source srcset="${src.replace(/\.\w+$/, '.webp')}"} type="image/webp">
    <img src="${src}" alt="${alt}">
</picture>
`;
            img.replaceWith(picture);
          }
        });
      },
      parserOptions: {
        decodeEntities: false
      }
    }))
    .pipe(plugins.gulp.dest(paths.html.dest))
    .pipe(plugins.browserSync.stream());
}


