const name = '001_ru_avrin_group'; // название текущего проекта
const allprojects = 'all/2024'; // папка со всеми текущими проектами

// `allSources` и `sources` - исходники для нового проекта
const allSources = 'apps/sources'; // исходная папка (из неё берём проект `sources`)
const sources = 'source'; // папка проекта (в allSources) с которого делаем копию при создании нового проекта

export const setFolders = {
  name, // название текущего проекта
  allprojects, // текущая папка со всеми проектами
  allSources, // отсюда берём sources
  sources, // исходники для нового проекта
  isBuild: process.argv.includes('--build'), // если есть флаг `--build` то - режим `production` (!не менять)
}
