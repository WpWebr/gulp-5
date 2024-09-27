const name = 'a'; // название текущего проекта
const allprojects = 'allprojects'; // новая папка со всеми текущими проектами

// `allSources` и `sources` - исходники для новрго проекта
const allSources = 'allprojects'; // исходная папка со всеми проектами (из неё берём проект `sources`)
const sources = 'a'; // папка проекта с которого делаем копию при создании нового проекта


export const setings = {
  name, // название текущего проекта
  isBuild: process.argv.includes('--build'), // если есть флаг `--build` то - режим `production`
  ayBuild: false, // ести 'true' то в режиме `development` файлы JS и CSS сжаты и нет `sourcemaps`
  allprojects, // новая папка со всеми проектами
  allSources, // папка со всеми проектами
  sources:  `${sources}/src`, // исходники для нового проекта
  dest: 'dist', // папка с результатами
  sprite: 1, // создавать спрайт - команда `gulp svg`
  spriteName: 'sprite.svg', // имя файла спрайта
  spriteDelAtribut: 1, // удаление атрибутов .svg для спрайта (fill,stroke,style)
  avif: 0, // создавать .avif
  webp: 1, // создавать .webp
  imagemin: 1, // сжимать изображения
  // При создании изображений .avif и .webp создаётся и тег "picture"
  extensions: ['.png','.jpg'], // для каких файлов создаем 'picture'
  noPicture : ['no-picture'],  // если находим этот класс для тега 'img', то не создаем 'picture' (можно ставить несколько классов)
  noPictureDel : true, // удалять классы прописанные в `noPicture`?
  collapseHTML: 0, // сжать HTML
  webpCSS: 1, // поддержка .webp в CSS (если JS добавил слиль 'wemp' к <html> - см. README.md)
  noCleanCSSfile: 1, // создавать не сжатый файл style.css
}

// const src = `project/src/${setings.name}/` // папка с исходниками

// const dest = `project/${setings.dest}/${setings.name}/`; // папка с результатами