const name = 'a'; // название текущего проекта
const allprojects = 'allprojects'; // новая папка со всеми текущими проектами

// `allSources` и `sources` - исходники для новрго проекта
const allSources = 'allprojects'; // исходная папка со всеми проектами (из неё берём проект `sources`)
const sources = 'a'; // папка проекта с которого делаем копию при создании нового проекта

export const setings = {
  name, // название текущего проекта
  isProduction: false, // false - development, true - production
  allprojects, // новая папка со всеми проектами
  allSources, // папка со всеми проектами
  sources:  `${sources}/src`, // исходники для нового проекта
  dest: 'dist', // папка с результатами
  sprite: 1, // создавать спрайт - команда `gulp svg`
  spriteName: 'sprite.svg', // имя файла спрайта
  spriteDelAtribut: 1, // удаление атрибутов .svg для спрайта (fill,stroke,style)
  avif: 0, // создавать .avif
  webp: 1, // создавать .webp
  imagemin: 1, // сжимать фото
  // При создании изображений .avif и .webp создаётся и тег "picture"
  extensions: ['.png','.jpg'], // для каких файлов создаем 'picture'
  noPicture : ['no-picture'],  // если находим этот класс для тега 'img', то не создаем 'picture' (можно ставить несколько классов)
  noPictureDel : true, // удалять классы прописанные в `noPicture`?
  collapseHTML: 1, // сжать HTML
}

// const src = `project/src/${setings.name}/` // папка с исходниками

// const dest = `project/${setings.dest}/${setings.name}/`; // папка с результатами