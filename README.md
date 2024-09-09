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
# Рабочая директория
│
├── dist                          # создается автоматически как и все её вложения
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
├── node_modules                  # "системная" - создается автоматически
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
package name: (mu-gulp)
version: (1.0.0)
description: Gulp 5 для верстки
entry point: (index.js)
test command:
git repository: https://github.com/ник/mu-gulp
keywords:
author: ник
license: (ISC)
```

- В _package.json_ прописываем:

```
  "main": "gulpfile.js",
  "type": "module",
```
- создаём `.gitignore`
```
dist/
package-lock.json
node_modules/
src/
```
или берём [тут](https://github.com/github/gitignore/blob/main/VisualStudio.gitignore)
- и дополняем как минимум:
```
dist/
package-lock.json
``` 
- создаём `gulpfile.js`
- разобраться подробнее с сожданием задач [здесь](https://rufri.ru/sovremennaja-cborka-gulp-dlja-veb-razrabotki/)

- создаём основную структуру проэкта: (подробнее см. выше) 
```
# Папка проекта
├── gulp
├── src
├──.gitignore                     # файл для Git - за чем не следит Git
├── gulpfile.js                   # файл с настройками Gulp
├── package.json                  # файл с настройками сборки и установленными пакетами
└── README.md 
```
<!-- ```
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
``` -->

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

<!-- ### Преключение на использование .pug (если будем использовать)
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
- npm i -D gulp-pug              // установка Pug -->

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
- обрабатываются только новые изображения при запуске сборки - команда:
- `gulp`
- оптимизированные изображения в папке `src/images/`
- в процессе работы сборки при добавлении изображений есть проблема см. "ПРОБЛЕМЫ" 

### Создание SVG спрайта 
- `.svg` файлы для спрайта разместить в папке ` src/img/sprite/ `  
- _Не входит_ в общий сценарий и создается отдельно запуском команды:
  `gulp svg`
- созданный спрайт и инструкция находятся в папке `src/img/sprite`
- при запуске сборки спрайт переносится в папку `dist/images/sprite`

<!-- 
### Создание <picture> для подключение изображений  .avif, .webp 
- см. плагины и настройки в файле `html.js`
- путь к изображениям `@img/`

### Подключение дополнений
- swiper // Слайдер Swiper https://swiperjs.com/get-started -->

<!-- ### Запуск - команда:

#### режимы без создания спрайта и конвертации шрифтов
- `gulp dev` или `gulp` - режим разработчика (по умолчанию)
- папки (если они есть) преносятся в `dist/`:
  - со шрифтом `src/fonts`
  - спрайтом `src/img/sprite`

#### режимы создания спрайта и конвертации шрифтов
- `gulp svg` - создание спрайта из SVG
- `gulp fonts` - конвертация шрифтов в формат woff и woff2

#### Режим сдачи заказа (продакшен) для лендинга (максимальное сжатие всех файлов)
- `npm run buildZ` - режим продакшен
- `npm run zipZ` - создание ZIP архива
- `npm run deployZ` - отправка проекта по FTP на сервер
#### Режим сдачи заказа (продакшен) для бэкенда (два варианта файлов сжатый и не сжатый)
- `npm run buildB` - режим продакшен
- `npm run zipB` - создание ZIP архива 
- `npm run deployB` - отправка проекта по FTP на сервер -->


<!-- ## ОСНОВНЫЕ КОМАНДЫ

### Запуск в режиме разработчика :
`gulp dev` или `gulp`
- создание спрайта, обработка изображений и шрифтов здесь не запускается, а только переносится готовый резутьтат.. 

### КОМАНДЫ ЗАПУСКАЕМЫЕ ОТДЕЛЬНО

- `gulp svg` - создание спрайта из SVG
- `gulp fonts` - конвертация шрифтов в формат woff и woff2

`npm run sprite` - создание SVG спрайта
- исходники в src/img/svgicons/
- результат в src/zpass/svgicons/

`npm run fonts` - шрифты
- перед запуском _удалить_ `src/scss/fonts.scss`
- исходники в src/fonst
- результат в src/zpass/fonts -->

## ПРОБЛЕМЫ
- при добавлении изображений в подпапку папки src/img - изображения копируются в корневую папку dist/images, без учета подпапки 
* лечится при перезапуске




    

