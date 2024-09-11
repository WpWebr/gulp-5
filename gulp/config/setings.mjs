export const setings = {
  // name:  'a', // название проекта
  name:  'bv', // название проекта
  isProduction: false, // false - development, true - production 
  sources:  'a/src', // исходники для нового проекта
  dest: 'dist', // папка с результатами
  sprite: 1, // создавать спрайт - команда `gulp svg`
  spriteName: 'sprite.svg', // имя файла спрайта
  spriteDelAtribut: 1, // удаление атрибутов .svg для спрайта (fill,stroke,style)
}

// const src = `project/src/${setings.name}/` // папка с исходниками

// const dest = `project/${setings.dest}/${setings.name}/`; // папка с результатами