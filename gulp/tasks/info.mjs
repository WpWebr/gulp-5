import { paths } from '../config/paths.mjs';
import { setings } from '../config/setings.mjs';
import { plumberError } from './errors.mjs';

export function info(done) {
  // console.log(`Запущен проект "${paths.allProdjects}/${setings.name}"`);
  plumberError(`Запущен проект "${paths.allProdjects}/${setings.name}"`, 'Info');
  done();
}
