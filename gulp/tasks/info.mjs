import { paths } from '../config/paths.mjs';
import { setings } from '../config/setings.mjs';
import { plumberError } from './errors.mjs';

export function info(done) {

  if (setings.isBuild) {
    plumberError(`Собран проект "${paths.allProdjects}/${setings.name}"`, 'Info');
    done();
  } else {
    plumberError(`Запущен проект "${paths.allProdjects}/${setings.name}" http://localhost:3000`, 'Info');
    done();
  }

}
