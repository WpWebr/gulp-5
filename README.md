## Команды запуска сборки:

### по умолчанию (режим `development`)
- `gulp`, `gulp dev` или `npm run dev`
- `ctrl` + `c` - выход с режима по умолчанию

- настройки в файле `gulp/config/setings.mjs`:
```
  ayBuild: false, // ести 'true' то в режиме `development` файлы JS и CSS сжаты и нет `sourcemaps`
```

### режим `production`
- `npm run build` или `gulp build --build`

_Шрифт конверируется отдельно. Если он уже сконвертирован, то переносится в результат_

### конвертация шрифтов (запускается отдельно)
- `gulp fonts` - конвертация шрифтов в формат woff и woff2 и создания `.scss` файла для их подключения 
- `gulp fontsStyle` - создание `.scss` файла для подключения шрифтов без их конвертации (только если они уже сконвертированы)

### создание спрайта из SVG
- `gulp svg`

### создание ZIP
- `npm run zip` или `gulp zip --build`
(создается в папке проекта)

## Настройки сборки

### Создание/перключение между верстками (setings.mjs)
- Проекты верстки можно создавать без перенесения всей сборки
- настройки в файле `gulp/config/setings.mjs`:
```
const name = 'a'; // название текущего проекта
const allprojects = 'allprojects'; // новая папка со всеми текущими проектами

// `allSources` и `sources` - исходники для новрго проекта
const allSources = 'allprojects'; // исходная папка со всеми проектами (из неё берём проект `sources`)
const sources = 'a'; // папка проекта с которого делаем копию при создании нового проекта
``` 
- для создания нового пректа в файле задайте его название переменной `name`
- при запуске сборки (`gulp`) будет созданна папка `allprojects/(ваше название)` и запушен новый проект на основе исходников перенесённых с `allprojects/a/src`
- исходные файлы нового проекта в `allprojects/(ваше название)/src`
- результат нового проекта в `allprojects/(ваше название)/dist`
- для переключения на другую верстку задайте её название переменной `name: (название)`- верстка запустится с соответствующих исходников `allprojects/(название)/src`
- можно создавать новую папку со всеми проектами - переменная `allprojects` в которую будет перенесён проект `allSources`/`sources` (по умолчанию `allprojects/a`)

_Далее в путях под `src` подразумевается `allprojects/(ваше название)/src`, а под `dist` - `allprojects/(ваше название)/dist`_

### Шрифты (fonts.mjs)
- Для обновления `.scss` файла подключения шрифта
  `src/scss/_fonts.scss` его нужно  _удалить_!
- Файлы шрифтов разместить в папке ` src/fonst `  
- _Не входит_ в общий сценарий и создается отдельно запуском команды:
  `gulp fonts`
- преобразованные файлы находится в папке `src/fonts/fonts_woff`
- при запуске сборки файлы с `src/fonts/fonts_woff` переносится в `dist/fonts`

### Обработка изображений
- исходные изображения в папке `src/images`
- настройки в файле `gulp/config/setings.mjs`:
```
  avif: 0, // создавать .avif
  webp: 1, // создавать .webp
  imagemin: 1, // сжимать изображения
```
- обрабатываются только новые (из папки `src/images`) изображения при запуске сборки (команда: `gulp`)
- сжатые изображения в папке `src/aa/img_min`
- созданные .webp и .avif в папке `src/aa/img`
- переносятся в `dist/images`

### Добавляем тег `picture` (html.mjs)
- При создании изображений .avif и .webp создаётся и тег "picture"
- настройки в файле `gulp/config/setings.mjs`:
```
  extensions: ['.png','.jpg'], // для каких файлов создаем 'picture'
  noPicture : ['no-picture'],  // если находим этот класс для тега 'img', то не создаем 'picture' (можно ставить несколько классов)
  noPictureDel : true // удалять классы прописанные в `noPicture`?
``` 
### Использование изображений `.webp` в CSS
- для проверки поддержания браузером формата `.webp` в JS прописываем:
```
// Проверка поддержки webp
export function isWebp() {
  function testWebP(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса для HTML
  testWebP(function (support) {
    if (support == true) {
      document.documentElement.classList.add('webp');
    }
  });
}
```
- Скрипт выше добавляет класс `webp` к тегу `html`
- в CSS добаляется стиль для .webp 
- Например:
```
.webp body { background-image: url(../images/name.webp); }
```
- настройки в файле `gulp/config/setings.mjs`:
```
webpCSS: true, // поддержка .webp в CSS
```

### Создание `.svg` спрайта (svg.mjs)
- `.svg` для спрайта в папке `src/img/sprite`
- настройки в файле `gulp/config/setings.mjs`:
```
  sprite: 1, // создавать спрайт - команда `gulp svg`
  spriteName: 'sprite.svg', // имя файла спрайта
  spriteDelAtribut: 1, // удаление атрибутов .svg для спрайта (fill,stroke,style)
```
- готовый спрайт в папке `src/images/sprite/sprite` (переносятся в `dist/images/sprite`)
- инструкция для спрайта в папке `src/images/sprite/stack`
- для обновления спрайт команда `gulp svg`(или удалить папку с `.svg` для спрайта) 
- если сборка запущена, то спрайт обновляется при добавления новых `.svg`

### Обработка CSS (stules.mjs)
- Компиляция SCSS в CSS
- замена `@img/` на `../images/`
- в CSS добаляется стиль для `.webp` (см. "Использование изображений `.webp` в CSS" )
- вендорные префиксы
- групировка медиа запросов
- сжатие - настройки в файле `gulp/config/setings.mjs`:
```
noCleanCSSfile: 1, // создавать не сжатый файл style.css
```
- сжатый файл `style.min.css` (создаётся всегда)



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

## ПЕРЕНОС СБОРКИ
### Забираем папки и файлы в новую папку:
- allprojects
- gulp
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
├── allprojects
|   ├── a                               # "Проект-каркас" - не удалять
|   |   ├── dist                         # РЕЗУЛЬТАТ - создается автоматически как и все её вложения
|   |   │   ├── css                       # папка стилей
|   |   │   │   ├── style.css              # не сжатый файл стилей
|   |   │   │   └── style.min.css          # сжатый файл стилей
|   |   │   ├── files                     # папка с разными файлами
|   |   │   ├── fonts                     # папка со шрифтами
|   |   │   ├── images                    # папка с изображениями
|   |   │   │   ├── sprite                  
|   |   │   │   |   └── sprite.svg          # спрайт
|   |   │   │   └── svg                    # .svg
|   |   │   ├── js                        # папка для JS файлов
|   |   │   │   └── app.min.js             # сжатый файл
|   |   │   └──  index.html               # HTML файл
|   |   |
|   |   └── src                          # ИСХОДНИКИ
|   |       ├── aa                         # Вспомогательная папка для изображений и т.п.
|   |       |   ├── img                    # - Изображения .webp, .avif
|   |       |   └── img_min                # - Изображения сжатые
|   |       ├── files                      # Файлы не требующие обработки - переносятся как есть
|   |       ├── fonts                      # Шрифты - исходники
|   |       ├── sources                    # всякая всячина - не используется                   
|   |       ├── html                       # - HTML компоненты
|   |       │   └── pug                     # - - PUG компоненты (при использовании PUG)
|   |       ├── images                    # - Изображения не обработанные
|   |       │   ├── sprite                  # - .svg для спрайта 
|   |       │   |   ├── sprite                   
|   |       │   |   |   └──  sprite.svg       # -- готовый спрайт
|   |       │   |   ├── stask            
|   |       │   |   └── sprite.symbol.html  # -- инструкция
|   |       │   └── svg                    # .svg - не для спрайта
|   |       ├── js                         # Скрипты
|   |       │   ├── components              # - подключаемые компоненты (слайдер и т.п.)
|   |       │   ├── modules                 # - подключаемые модули
|   |       │   │   └── functions.js         # -- основные функции (настройки слайдеров и т.п.)
|   |       │   └── app.js                  # - главный скрипт - подключение всех скриптов
|   |       ├── scss                       # Стили сайта ( в scss-синтаксисе )
|   |       │   ├── _fonts.scss             # - подключение шрифтов - создается автоматически
|   |       │   └── style.scss              # - главный файл стилей
|   |       ├── index.html                 # Главный html-файл
|   |       └── index.pug                  # Главный pug-файл
|   |
|   └── (ваше название)          # текущий проект (про создание/перключение см. выше)
|       ├── dist
|       └── src
│
├── node_modules                 # "системная" - создается автоматически
│
├── gulp                         # папка с вспомогательными файлами
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
│   │   ├── info.mjs               # вывод в консоль ссылки на запущенный проект
│   │   ├── js.mjs                 # - JS
│   │   ├── scss.mjs               # - SCSS
│   │   ├── serve.mjs              # сервер
│   │   ├── svg.mjs                # создание спрайта с .svg файлов
│   │   └── tasks.mjs              # задачи
│   └──version.json               # версия файлов (создается автоматически в html.js)
│
├── .gitignore                   # игнорируемые файлы для Git
|
├── gulpfile.js                  # файл с настройками Gulp
├── package-lock.json            # "системный" - создается автоматически
├── package.json                 # файл с настройками сборки и установленными пакетами
└── README.md                    # документация сборки
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
package-lock.json
node_modules/
allprojects/
version.json
```
или берём [тут](https://github.com/github/gitignore/blob/main/VisualStudio.gitignore)
- и дополняем как минимум:
```
allprojects/
package-lock.json
version.json
``` 
- создаём `gulpfile.js`
- разобраться подробнее с созданием задач [здесь](https://rufri.ru/sovremennaja-cborka-gulp-dlja-veb-razrabotki/)

- создаём основную структуру проекта: (подробнее см. выше) 
```
# Папка проекта
├── allprojects                   # проеты версток
├── gulp                          # настройки и задачи
├──.gitignore                     # файл для Git - за чем не следит Git
├── gulpfile.js                   # файл с настройками Gulp
├── package.json                  # файл с настройками сборки и установленными пакетами
└── README.md 
```

### Настройки VS Code

- открываем терминал
- Выберите профиль по умолчанию
- выбираем PowerShell

#### Плагин для VS Code
- `Path Autocomplete` - устанавливаем (в VS Code)
- `F1` ищем `Open Settings (JSON)`
(пользавательские настройки - settings.json)
- прописываем:
```
"path-autocomplete.pathMappings": {
"@img": "${folder}/(путь к проекту)/src/images", // псевдоним для изображений
"@scss": "${folder}/(путь к проекту)/src/scss", // псевдоним для scss
"@js": "${folder}/(путь к проекту)/src/js", // псевдоним для js
},
```
- "путь к проекту" - по умолчанию это `allprojects/a`
- теперь например при написании `@img` будет работать поиск по `./allprojects/a/images` и выводить подсказки имеющихся файлов

### Установка плагинов ( npm i -D < название >)
(все плагины подключаются в файле gulp/config/plugins.mjs c последующим импортом)
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
- gulp-webpcss                   // Вывод WEBP изображений для CSS
- webp-converter@2.2.3           // Конвертер в WEBP (версия `@2.2.3` для свазки с `gulp-webpcss`)
- gulp-autoprefixer              // Добавление вендорных префиксов
- gulp-group-css-media-queries   // Группировка медиа запросов
- webpack webpack-stream         // Webpack и модуль webpack-stream
- gulp-webp                      // Преобразование изображений в формат .webp
- gulp-avif                      // Преобразование изображений в формат .avif
- gulp-imagemin                  // Сжатие изображений
- gulp-newer                     // Проверка наличия обновления картинки
- gulp-fonter gulp-ttf2woff2     // Преобразование шрифтов
- gulp-svg-sprite                // Создание SVG спрайта
- gulp-if                        // Условное ветвление
- gulp-htmlmin                   // Сжатие HTML и др.

### Подключение модулей js
#### Подключение слайдера Swiper из npm-modules
- npm i -D swiper                // установка Swiper - [сайт](https://swiperjs.com/get-started)


<!-- 
### Подключение дополнений
- swiper // Слайдер Swiper https://swiperjs.com/get-started -->

<!-- ### Запуск - команда:

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
- пока не заметил :)




    

