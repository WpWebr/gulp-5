export const setings = {
  // dest: 'dist', //название папки с результатами
  ayBuild: false, // ести 'true' то в режиме `development` файлы JS и CSS сжаты и нет `sourcemaps`
  sprite: 1, // создавать спрайт - команда `gulp svg`
  // spriteName: 'sprite.svg', // имя файла спрайта
  spriteDelAtribut: 1, // удаление атрибутов .svg для спрайта (fill,stroke,style)
  avif: false, // создавать .avif
  avifQuality: 90, // качество .avif можно настроить (от 0 до 100). По умолчанию 90
  webp: true, // создавать .webp
  imagemin: true, // сжимать изображения
  // При создании изображений .avif и .webp создаётся и тег "picture"
  extensions: ['.png','.jpg','.jpeg'], // для каких файлов создаем 'picture'
  noPicture : ['no-picture'],  // если находим этот класс для тега 'img', то не создаем 'picture' (можно ставить несколько классов)
  noPictureDel : false, // удалять классы прописанные в `noPicture`?
  collapseHTML: false, // сжать HTML
  webpCSS: 1, // поддержка .webp в CSS (если JS добавил слиль 'wemp' к <html> - см. README.md)
  noCleanCSSfile: 1, // создавать не сжатый файл style.css
}
