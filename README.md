## Запуск - команды:

### режимы без создания спрайта и конвертации шрифтов
- `gulp dev` или `gulp` - режим по умолчанию
- `ctrl` + `c` - выход с режима по умолчанию

### режимы создания спрайта и конвертации шрифтов
- `gulp fonts` - конвертация шрифтов в формат woff и woff2 и создания файла для их подключения 
- `gulp fontsStyle` - создания файла для подключения шрифтов без их конвертации (только если они уже сконвертированы)

- `gulp svg` - создание спрайта из SVG

<!-- - `npm run all` - создание спрайта + конвертация шрифтов + режим по умолчанию 
- `npm run imagesAll` - обработка изображений (результат в src/zpass/img/)

### Режим сдачи заказа (продакшен) для лендинга (максимальное сжатие всех файлов)
- `npm run buildZ` - режим продакшен
- `npm run zipZ` - создание ZIP архива
- `npm run deployZ` - отправка проекта по FTP на сервер
### Режим сдачи заказа (продакшен) для бэкенда (два варианта файлов сжатый и не сжатый)
- `npm run buildB` - режим продакшен
- `npm run zipB` - создание ZIP архива 
- `npm run deployB` - отправка проекта по FTP на сервер -->

## СОЗДАНИЕ НОВОГО ПРОЕКТА ( перенос )

### Забираем папки и файлы в новую папку:
- gulp
- src
- gulpfile.js
- .gitignore
- package.json
- README.md
### Запуск в новой папке команда:
- npm i

## СТРУКТУРА ПРОEКТА

```
# Папка проекта
│
├── dist                          # папка ПРОЕКТа - создается автоматически как и все её вложения
│   ├── css                       # папка стилей
│   │   ├── style.css             # не сжатый файл стилей
│   │   └── style.min.css         # сжатый файл стилей
│   ├── files                     # папка с разными файлами
│   ├── fonts                     # папка со шрифтами
│   ├── images                    # папка с изображениями
│   │   └── svg                    # .svg
│   │      └── sprite.svg           # спрайт
│   ├── js                        # папка для JS файлов
│   │   └── app.min.js             # сжатый файл
│   └──  index.html               # HTML файл
│
├── node_modules                  # "системная"
│
├── gulp                          # папка с вспомогательными файлами
│   ├── config                    # папка с настройками
│   │   ├── ftp.mjs                # настройки выгрузки на сервер
│   │   ├── path.mjs               # файл с путями
│   │   ├── plugins.mjs            # oбщие плагины используемые в сценариях 
│   │   └── setings.mjs            # настройки сборки              
│   ├── tasks                     # Папка для задач
│   │   ├── copy.mjs               # копирование файлов
│   │   ├── del.mjs                # удаление
│   │   ├── errors.mjs             # вывод ошибок
│   │   ├── fonts.mjs              # для шрифтов
│   │   ├── html.mjs               # - HTML
│   │   ├── images.mjs             # - img
│   │   ├── js.mjs                 # - JS
│   │   ├── scripts.mjs            # - JS
│   │   ├── scss.mjs               # - SCSS
│   │   ├── serve.mjs              # сервер
│   │   ├── svg.mjs                # создание спрайта с .svg файлов
│   │   └── tasks.mjs              # задачи
│   └──version.json               # версия файлов (создается автоматически в html.js)
│
├── src                           # ИСХОДНИКИ
│   ├── files                      # Файлы не требующие обработки - переносятся как есть
│   ├── fonts                      # Шрифты - исходники
│   ├── sources                    # всякая всячина - не используется                   
│   ├── html                       # - HTML компоненты
│   │   └── pug                     # - - PUG компоненты (при использовании PUG)
│   ├── images                    # - Изображения обработанные (создается автоматически)
│   ├── img                       # - Изображения не обработанные
│   │   ├── sprite                  # - .svg для спрайта 
│   │   |   └── symbol            
│   │   |       ├── sprite.svg         # -- готовый спрайт
│   │   |       └── sprite.symbol.html # -- инструкция
│   │   └── svg                    # .svg - не для спрайта
│   ├── js                         # Скрипты
│   │   ├── components              # - подключаемые компоненты (слайдер и т.п.)
│   │   ├── modules                 # - подключаемые модули
│   │   │   └── functions.js         # -- основные функции (настройки слайдеров и т.п.)
│   │   └── app.js                  # - главный скрипт - подключение всех скриптов
│   ├── scss                       # Стили сайта ( в scss-синтаксисе )
│   │   ├── _fonts.scss             # - подключение шрифтов - создается автоматически
│   │   └── style.scss              # - главный файл стилей
│   ├── index.html                 # Главный html-файл
│   └── index.pug                  # Главный pug-файл
│
├── .gitignore                    # игнорируемые файлы для Git
|
├── gulpfile.js                   # файл с настройками Gulp
├── package-lock.json             # "системный"
├── package.json                  # файл с настройками сборки и установленными пакетами
└── README.md                     # документация сборки
```



## УСТАНОВКА С НУЛЯ (для Windows)

### Настройка политики запуска скриптов (Execution Policy) PowerShell
- заходим в `PowerShell`
- проверяем политику запуска скриптов командой `Get-ExecutionPolicy`
- если политика отличается от `RemoteSigned`, то вводим команду:
`Set-ExecutionPolicy RemoteSigned –Force`
- проверяем - `Get-ExecutionPolicy`. Политика должна измениться на `RemoteSigned`

### Проверка глобальных установок программ
- `node -v`
- `npm -v`
- если нет, то устанавливаем LTS версию: [https://nodejs.org/](https://nodejs.org/)

- `git -v`
- если нет, то [устанавливаем](https://git-scm.com/download/): [git для Windows](https://git-scm.com/download/win)

- `gulp -v`
- если нет, то устанавливаем глобально `npm i gulp-cli -g`

### Обновление

- node и npm
- Скачиваем и устанавливаем LTS версию: [https://nodejs.org/](https://nodejs.org/) 

- git (если уже установлен)
- `git clone https://github.com/git/git`

- gulp
- `npm rm --global gulp` - удаляем глобально
- `npm i gulp-cli -g`    - устанавливаем глобально

### Настройки VSC

- открываем терминал
- Выберите профиль по умолчанию
- выбираем PowerShell

#### Плагин для VS Code
- Path Autocomplete - устанавливаем (в VS Code)
- `F1` ищем `Open Settings (JSON)`
(пользавательские настройки - settings.json)
- прописываем:
```
"path-autocomplete.pathMappings": {
"@img": "${folder}/src/images", // alias for images
"@scss": "${folder}/src/scss", // alias for scss
"@js": "${folder}/src/js", // alias for js
},
```
- теперь например `@img` будет заменяться на `./src/images`

### Инициализация среды
- `npm init`

```
package name: (mu-gulp-2024)
version: (1.0.0)
description: Gulp + Webpack - для верстки
entry point: (index.js)
test command:
git repository: https://github.com/WpWebr/mu-gulp-2024.git
keywords:
author: WpWebr
license: (ISC)
```

- В _package.json_ прописываем:

```
  "main": "gulpfile.js",
  "type": "module",
```
- создаём [.gitignore](https://github.com/github/gitignore/blob/main/VisualStudio.gitignore)
- и дополняем как минимум:
```
dist/
package-lock.json
``` 

- создаём `gulpfile.js`

- создаём основную структуру проэкта:

```
# Папка проекта
├── gulp                          # папка с вспомогательными файлами
│   ├── config                    # папка с настройками
│   │   ├── ftp.js                # настройки выгрузки на сервер
│   │   ├── path.js               # файл с путями
│   │   └── plugins.js            # oбщие плагины используемые в сценариях              
│   └── tasks                     # Папка для задач
│       ├── copy.js               # Копирование файлов
│       ├── fots.js               # для шрифтов
│       ├── html.js               # - HTML
│       ├── images.js             # - img
│       ├── js.js                 # - JS
│       ├── reset.js              # удаление
│       ├── scss.js               # - SCSS
│       ├── server.js             # сервер
│       └── sprite.js             # создание спрайта с .svg файлов
│
├── src                           # ИСХОДНИКИ
│   ├── files                     # Файлы не требующие обработки - переносятся как есть
│   ├── fonts                     # Шрифты - исходники
│   │   └── fonts-woff            # - - преобразованные шрифты (создаётся автоматически)
│   ├── html                      # - HTML компоненты
│   │   └── pug                   # - - PUG компоненты (при использовании PUG)
│   ├── img                       # - Изображения
│   │   └── svg_sprite            # - - .svg - исходники для спрайта
│   ├── js                        # Скрипты
│   │   ├── components            # - подключаемые компоненты (слайдер и т.п.)
│   │   ├── modules               # - подключаемые модули
│   │   │   └── functions.js      # -- основные функции (настройки слайдеров и т.п.)
│   │   └── app.js                # - главный скрипт - подключение всех скриптов
│   ├── scss                      # Стили сайта ( в scss-синтаксисе )
│   │   └── style.scss            # - главный файл стилей
│   ├── index.html                # Главный html-файл
│   ├── index.pug                 # Главный pug-файл
│   └── .gitignore                # файл для Git - за чем не следит Git в исходниках (отдельный репозиторий) 
│ 
├──.gitignore                     # файл для Git - за чем не следит Git
├── gulpfile.js                   # файл с настройками Gulp
├── package-lock.json             # "системный"
├── package.json                  # файл с настройками сборки и установленными пакетами
└── README.md                     # документация сборки
```

- path.js - файл с путями:
```
const buildFolder = `./dist`;
const srcFolder = `./src`;
```
### Пример настройки `tasks`

#### Перенос файлов как есть из `src` в `dist`:
- в путях (`path.js`) прописываем:
```
  build: {
    // в папку ./dist/files/
    files: `${buildFolder}/files/`,
  },
  src: {
    // Все файлы с папки и подпапок ./src/files/
    files: `${srcFolder}/files/**/*.*`,
  },
  watch: { 
    // Все файлы с папки и подпапок ./src/files/
    files: `${srcFolder}/files/**/*.*`,
  },
```
- в `gulpfile.js`:
```
// Основные модули
import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';
// Передаем значения в глобальную переменную
global.app = {
  gulp: gulp,
  path: path,
}
```
- создаём (задачу - `tasks`) файл:
./gulp/tasks/copy.js
```
export const copy = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
}
```
- Прописываем в `gulpfile.js`:
```
// Импорт задач
import { copy } from './gulp/tasks/copy.js'; // копирование
// Наблюдаем за изменениями в файлах
function watcher() {
  // путь к файлам , и действие которое выполняем
  gulp.watch(path.watch.files, copy);
}
// Cценарий по умолчанию:
const dev = gulp.series(copy,watcher);

// Выполнение сценария по умолчанию
gulp.task('default', dev);
```


### Установка плагинов ( npm i -D < название >)
- gulp                     // Галп
- del                      // для удаления/очистки
- gulp-file-include        // для разбиения HTML на компоненты
- gulp-replace             // Поиск и замена
- (gulp-webp-html-nosvg    // Контейнер _picture_ для .webp формата картинок - или следующий gulp-picture-html - лучше )
- gulp-picture-html        // Контейнер _picture_ для .webp и .avif формата картинок
- gulp-htmlmin             // Сжатие HTML
- gulp-format-html         // разжатие/форматирование
- gulp-version-number      // Динамическая версия файла
- gulp-plumber             // Обработка ошибок
- gulp-notify              // Сообщения-подсказки
- browser-sync             // Локальный сервер

### Преключение на использование .pug (если будем использовать)
- в файле _gulp/config/path.js_ в переменной `global.pug = 'html';` меняем `html` на `pug`
- в файле _gulp/tasks/html.js_ комментируем - // .pipe(fileinclude())
- и добавляем:
```
.pipe(pug({
  // Сжатие
  pretty: true,
  // Показывать в терменале какой файл обработан 
  verbase: true
}))
```
- создаем соответствующие файлы _*.pug_ 
- npm i -D gulp-pug              // установка Pug

- sass                           // Препроцесор SASS 
- gulp-sass                      // и установщик его (SASS) в Gulp
- gulp-rename                    // Переименование файлов
- gulp-clean-css                 // Сжатие CSS файла
- gulp-webpcss                   // Вывод WEBP изображений
- webp-converter@2.2.3           // Конвертер в WEBP (версия `@2.2.3` для свазки с `gulp-webpcss`)
- gulp-autoprefixer              // Добавление вендорных префиксов
- gulp-group-css-media-queries   // Группировка медиа запросов
- webpack webpack-stream         // Webpack и модуль webpack-stream

### Подключение модулей js
#### Подключение слайдера Swiper из npm-modules
- npm i -D swiper                // установка Swiper - [сайт](https://swiperjs.com/get-started)

- gulp-webp                      // Преобразование изображений в формат .webp
- gulp-avif                      // Преобразование изображений в формат .avif
- gulp-imagemin                  // Сжатие изображений
- gulp-newer                     // Проверка наличия обновления картинки
- gulp-fonter gulp-ttf2woff2     // Преобразование шрифтов
- gulp-svg-sprite                // Создание SVG спрайта
- gulp-if                        // Условное ветвление
- gulp-htmlmin                   // Сжатие HTML и др.

### Шрифты
- Для обновления файла подключения шрифта
  `src/scss/_fonts.scss` нужно его _удалить_!
- Файлы шрифтов разместить в папке ` src/fonst `  
- _Не входит_ в общий сценарий и создается отдельно запуском команды:
  `gulp fonts`
- преобразованные файлы находится в папке `src/fonts/fonts_woff`
- при запуске сборки файлы с `src/fonts/fonts_woff` переносится в `dist/fonts` 


 
### Оптимизация и создание изображений в .avif, .webp
- подключаем плагины `gulp-webp`, `gulp-avif`, `gulp-imagemin` в файле `tasks\images.js`
- изображения ложим в папку `src/img/`
- команда:
- `npm run imagesAll`
- оптимизированные изображения в папке `src/zpass/minimg/`
- обработанные изображения `.avif, .webp` в папке `src/zpass/img/`

<!-- ### Перенос изображений в `dist/images/`
- включает в себя обработку изображений (`imagesAll`) и
- перенос из папок `src/zpass/img/`, `src/zpass/minimg/` и `src/zpass/sprite/`
- команда:
- `npm run imagesCopy`   -->

### Создание SVG спрайта 
- `.svg` файлы для спрайта разместить в папке ` src/images/sprite/ `  
- _Не входит_ в общий сценарий и создается отдельно запуском команды:
  `gulp svg`
- созданный спрайт находится в папке `src/images/sprite`
- инструкция по использованию - в папке `/zpass/svgicons/stack`
- при запуске сборки спрайт переносится в папку `dist/images/svg`


### Создание <picture> для подключение изображений  .avif, .webp 
- см. плагины и настройки в файле `html.js`
- путь к изображениям `@img/`

### Подключение дополнений
- swiper // Слайдер Swiper https://swiperjs.com/get-started

### Запуск - команда:

#### режимы без создания спрайта и конвертации шрифтов
- `npm run dev` или `gulp` - режим разработчика (по умолчанию)
- папки с шрифтом ./src/fonts/ и спрайтом ./src/img/icons/ (если они есть)
- преносятся в ./dist/

#### режимы создания спрайта и конвертации шрифтов
- `npm run sprite` - создание спрайта из SVG
- `npm run fonts` - конвертация шрифтов в формат woff и woff2
- `npm run all` - создание спрайта + конвертация шрифтов + режим разработчика 
- `npm run imagesAll` - обработка изображений (результат в src/zpass/img/)

#### Режим сдачи заказа (продакшен) для лендинга (максимальное сжатие всех файлов)
- `npm run buildZ` - режим продакшен
- `npm run zipZ` - создание ZIP архива
- `npm run deployZ` - отправка проекта по FTP на сервер
#### Режим сдачи заказа (продакшен) для бэкенда (два варианта файлов сжатый и не сжатый)
- `npm run buildB` - режим продакшен
- `npm run zipB` - создание ZIP архива 
- `npm run deployB` - отправка проекта по FTP на сервер









## ОСНОВНЫЕ КОМАНДЫ

### Запуск в режиме разработчика :
`npm run dev` или `gulp`
- создание спрайта, обработка изображений и шрифтов здесь не запускается, а только переносится готовый резутьтат.. 

### КОМАНДЫ ЗАПУСКАЕМЫЕ ОТДЕЛЬНО

`npm run imagesAll` - обработка изображений
- результат в src/zpass/img/

`npm run sprite` - создание SVG спрайта
- исходники в src/img/svgicons/
- результат в src/zpass/svgicons/

`npm run fonts` - шрифты
- перед запуском _удалить_ `src/scss/fonts.scss`
- исходники в src/fonst
- результат в src/zpass/fonts



    

