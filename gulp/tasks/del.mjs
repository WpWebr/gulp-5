import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';

export function clean() {
  return plugins.deleteAsync(paths.dest);
}