// Обработка JS файлов
export function scripts() {

  const sourcemaps = !(add.setFolders.isBuild || add.setings.ayBuild);

  return add.plugins.gulp.src(add.paths.scripts.src, { sourcemaps })
    .pipe(add.handleError('Scripts'))
    .pipe(add.plugins.webpack({
      mode: sourcemaps ? 'development' : 'production',
      output: {
        filename: 'app.min.js',
      }
    }))
    .pipe(add.plugins.gulp.dest(add.paths.scripts.dest, { sourcemaps: sourcemaps }))
    .pipe(add.plugins.server.stream());
}
