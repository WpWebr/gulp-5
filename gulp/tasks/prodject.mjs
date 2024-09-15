import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { setings } from '../config/setings.mjs';
import { handleError } from './errors.mjs';

// Создание нового проекта
export function nevProject(done) {

  // Создание новой папки со всеми проектами 
  // и перенос в неё исходного проекта
  // if (!plugins.fs.existsSync(paths.allProdjects)) {
  if (paths.allProdjects !== paths.allSources) {
    // Создание новой исходной папки и нового проекта из исходников
    plugins.mkdir(paths.allProdjects, { recursive: true });

    console.log(`${paths.allSources}/${paths.sources}/**/*`);
    console.log(paths.src);

    return plugins.gulp.src(`${paths.allSources}/${paths.sources}/**/*`, { encoding: false })
      .pipe(handleError('nevProject_Folder'))
      .pipe(plugins.gulp.dest(paths.src));
  } else if (!plugins.fs.existsSync(paths.prodject)) {
    // Создание нового проекта из исходников
    console.log(`${paths.allProdjects}/${paths.sources}/**/*`);

    return plugins.gulp.src(`${paths.allProdjects}/${paths.sources}/**/*`, { encoding: false })
      .pipe(handleError('nevProject'))
      .pipe(plugins.gulp.dest(paths.src));
  } else {
    done();
  }

}


