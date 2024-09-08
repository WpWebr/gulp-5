import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';

export function scripts() {
  return plugins.gulp.src(paths.scripts.src, { sourcemaps: !process.env.NODE_ENV === 'production' })
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError({
        title: 'Scripts Error',
        message: '<%= error.message %>',
        sound: 'Basso'
      })
    }))
    .pipe(plugins.gulpIf(!process.env.NODE_ENV === 'production', plugins.sourcemaps.init()))
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.gulpIf(process.env.NODE_ENV === 'production', plugins.uglify()))
    .pipe(plugins.gulpIf(!process.env.NODE_ENV === 'production', plugins.sourcemaps.write('.')))
    .pipe(plugins.gulp.dest(paths.scripts.dest))
    .pipe(plugins.browserSync.stream());
}