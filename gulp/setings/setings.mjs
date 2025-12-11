export const setings = {
  // const defaultSetings = { // Настройки по умолчанию
  ayBuild: true, // ести 'true' то в режиме `development` файлы JS и CSS сжаты и нет `sourcemaps`
  sprite: true, // создавать спрайт - команда `gulp svg`
  spriteDelAtribut: true, // удаление атрибутов .svg для спрайта (fill,stroke,style)
  avif: false, // создавать .avif
  avifQuality: 90, // качество .avif можно настроить (от 0 до 100). По умолчанию 90
  webp: false, // создавать .webp
  imagemin: false, // сжимать изображения
  // При создании изображений .avif и .webp создаётся и тег "picture"
  extensions: ['.png', '.jpg', '.jpeg'], // для каких файлов создаем 'picture'
  noPicture: ['no-picture'],  // если находим этот класс для тега 'img', то не создаем 'picture' (можно ставить несколько классов)
  noPictureDel: true, // удалять классы прописанные в `noPicture`?
  collapseHTML: false, // сжать HTML
  webpCSS: false, // поддержка .webp в CSS (если JS добавил слиль 'wemp' к <html> - см. README.md)
  noCleanCSSfile: false, // создавать не сжатый файл style.css
  copyAll: ['files', 'inc'], // папки преносимые с исходников (src) без изменения
  copyPHP: false // Копирование PHP-файлов и добавление index.php в папки с PHP файлами (для WordPress)
}

// // Асинхронная задача для динамического импорта модуля с использованием переменного пути
// const loadModule = async function () {
//   try {
//     let modulePath = add.paths.setings;
//     if (add.plugins.path.isAbsolute(modulePath)) { // если путь абсолютный:
//       modulePath = pathToFileURL(modulePath).href;
//     } else {
//       modulePath = add.plugins.path.resolve(modulePath);
//     }
//     // const module = await import(`./${paths.setings}`); // Используем переменную для пути
//     const module = await import(modulePath); // импорт модуля

//     global.add.setings = module.setings;  // Обновляем глобальную переменную
//   } catch (err) {
//     console.error('Ошибка при импорте модуля "setings":', err);
//   }
// };




// import path from 'path';
// import { access } from 'fs/promises';
// import { pathToFileURL } from 'url';

// Импорт дефолтных настроек
// import { setings as defaultSetings } from './gulp/setings/setings.mjs';

// // Функция загрузки пользовательских настроек отдельного проекта
// async function loadProjectSetings() {
//   loadModule;
//   const projectPath = add.paths.setings;

//   if (!projectPath) return {}; // нет пути → нет настроек → выходим

//   try {
//     // Проверяем, существует ли файл
//     await add.plugins.access(projectPath);

//     // Динамический импорт (обязательно через URL)
//     const moduleUrl = add.plugins.pathToFileURL(projectPath).href;
//     const projectModule = await import(moduleUrl);

//     return projectModule.setings || {};
//   } catch {
//     // Файла нет → просто игнорируем
//     return {};
//   }
// }

// // Объединение: проектные настройки > и дефолтные
// export async function setings() {
//   const project = await loadProjectSetings();
//   return { ...defaultSetings, ...project };
// }
