import { paths } from '../config/paths.mjs';
import { plugins } from '../config/plugins.mjs';
import { handleError, plumberError } from './errors.mjs';

// Шрифт
export async function fonts(done) {
  // Проверка на наличие шрифтов и создание дополнительной папки для .woff, .woff2
  const filesOtfTtf = checkFilesExistence(paths.fonts.src, ['.otf', '.ttf']);
  if (filesOtfTtf) {
    // Проверяем существует ли папка и если нет, то создаём   
    if (!plugins.fs.existsSync(paths.fonts.src_woff)) {
      plugins.fs.mkdirSync(paths.fonts.src_woff);
    }
    // выполняем серию задач
    // return gulp.series(otfToTtf, ttfToWoff, ttfToWoff2, copyWoffWoff2, generateFontsScss)(done);
    return plugins.gulp.series(copyWoffWoff2, otfToTtf, ttfToWoff, fontsStyle)(done);
  } else {
    // const message = `Нет файлов с расширением .ttf или .otf в папке ${paths.fonts.src}`;
    // notifierError('Error Fonts', message);

    // console.error(`Error: ${message}`);
    // // Уведомление через Windows
    // notifier.notify({
    //   title: 'Error Fonts',
    //   message: message,
    //   sound: true, // Воспроизведение звука при уведомлении
    // });
    done();
  }
}

// Функция проверки наличия файлов с несколькими расширениями в папке и выводом ошибки // возвращает true|false
function checkFilesExistence(folderPath, fileExtensions) {
  const fullPath = plugins.path.resolve(folderPath); //полный путь к папке
  // Проверяем, существует ли папка
  if (plugins.fs.existsSync(fullPath)) {
    // Читаем содержимое папки
    const files = plugins.fs.readdirSync(fullPath);
    // Проверяем наличие хотя бы одного файла с любым из указанных расширений
    const hasFiles = fileExtensions.some(extension =>
      files.some(file => file.endsWith(extension))
    );

    // Если файлы найдены, возвращаем true
    if (hasFiles) {
      return true;
    } else {
      // Если файлы не найдены, выводим уведомление об ошибке
      plumberError(`В папке ${folderPath} не найдены файлы ${fileExtensions.join(', ')}`, 'File Error');
      // messageError(`В папке ${folderPath} не найдены файлы ${fileExtensions.join(', ')}`);
      return false;
    }

  } else {
    // Если папка не существует выводим уведомление об ошибке
    plumberError(`Папка ${folderPath} не существует`, 'File Error')
    // messageError(`Папка ${folderPath} не существует`);
    return false;
  }
}

function copyWoffWoff2() {
  return plugins.gulp.src(`${paths.fonts.src}/*{.woff,.woff2}`, { encoding: false })
    .pipe(plugins.newer(paths.fonts.src_woff))
    // выгружаем в папку с результатом
    .pipe(plugins.gulp.dest(paths.fonts.src_woff));
}

function otfToTtf() { // .otf -> .ttf
  return plugins.gulp.src(`${paths.fonts.src}/*.otf`, { encoding: false })
    .pipe(handleError('otfToTtf'))
    .pipe(plugins.fonter({ // Конвертируем в .ttf
      formats: ['ttf']
    }))
    .pipe(plugins.newer(paths.fonts.src))
    .pipe(plugins.gulp.dest(paths.fonts.src));// выгружаем в исходную папку
}

function ttfToWoff() { //  .ttf -> .woff/.woff2
  return plugins.gulp.src(`${paths.fonts.src}/*.ttf`, { encoding: false })
    .pipe(handleError('ttfToWoff'))
    // Конвертируем в .woff
    .pipe(plugins.fonter({
      formats: ['woff']
    }))
    .pipe(plugins.newer(paths.fonts.src_woff))
    // выгружаем в папку с результатом 
    .pipe(plugins.gulp.dest(paths.fonts.src_woff))
    // ищем файлы шрифтов .ttf
    .pipe(plugins.gulp.src(`${paths.fonts.src}/*.ttf`, { encoding: false }))
    // Конвертируем в .woff2
    .pipe(plugins.ttf2woff2())
    .pipe(plugins.newer(paths.fonts.src_woff))
    // выгружаем в папку с результатом
    .pipe(plugins.gulp.dest(paths.fonts.src_woff));
}

function ttfToWoff2() { //  .ttf -> .woff/.woff2
  // const filesExist = await checkFilesExistence(paths.fonts.src, '.ttf');
  // if (filesExist) {// Ищем файлы шрифтов .ttf
  return plugins.gulp.src(`${paths.fonts.src}/*.ttf`, { encoding: false })
    .pipe(handleError('ttfToWoff2'))
    // Конвертируем в .woff2
    .pipe(ttf2woff2())
    // выгружаем в папку с результатом
    .pipe(plugins.gulp.dest(paths.fonts.src_woff));
  // }
}

export const fontsStyle = () => {

  plugins.fs.readdir(paths.fonts.src_woff, function (err, fontsFiles) {
    if (err) {
      console.error(`Не найдена папка ${paths.fonts.src_woff}`);
      return;
    }

    if (fontsFiles.length > 0) {// проверяем есть ли файлы шрифтов 
      // Путь файла стилей подключения шрифтов 
      const fontsSCSS = `${paths.fonts.scssDest}/${paths.fonts.scssFile}`;
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!plugins.fs.existsSync(fontsSCSS)) { // есле нет, то продолжаем
        let newFileOnly;// Переменная для записи названия файла шрифта
        fontsFiles.forEach(file => {
          // Название файла шрифта
          const fontFileName = plugins.path.basename(file, plugins.path.extname(file));
          // Записываем подключения шрифтов в файл стилей
          if (newFileOnly !== fontFileName) {
            const fontName = getfontName(fontFileName);
            const fontWeight = getFontWeight(fontFileName);
            const fontStyle = getFontStyle(fontFileName);

            plugins.fs.appendFile(fontsSCSS,
              `@font-face {
        font-family: '${fontName}';
        src: url('../fonts/${fontFileName}.woff2') format('woff2'),
             url('../fonts/${fontFileName}.woff') format('woff');
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
        font-display: swap;
      }\n`, err => {
              if (err) {
                console.error(err);
              } else {
                console.log(`Добавлено свойство в ${fontsSCSS}`);
              }
            });
            // Обновляем переменную для записи названия файла шрифта
            newFileOnly = fontFileName;
          }
        });

      } else {
        // Если файл есть выводим сообщение
        plumberError('Файл scss/_fonts.scss уже существует. Для обновления файла нужно его удалить! Команда для создания файла без конвертации шрифтов: gulp fontsStyle', 'fontsStyle');
      }

    } else {
      console.error(`Не найдены файлы шрифтов в ${paths.fonts.src_woff}`);
    }
  });

  // Получение названия шрифта
  function getfontName(fontFileName) {
    return fontFileName
      .replace(/Italic|Thin|ExtraLight|UltraLight|Light|Regular|Normal|Medium|SemiBold|DemiBold|Bold|ExtraBold|UltraBold|Black|Heavy/gi, '')// удаляем вес и стиль
      .replace(/^[\s-_]+|[\s-_]+$/g, '') // удаляем все пробелы, "-" и "_" c начала и в конце
      .replace(/^./, fontFileName[0].toUpperCase()); //Первая буква загловная
  }

  // Получение веса шрифта
  function getFontWeight(fontFileName) {
    if (/Thin/gi.test(fontFileName)) return 100;
    if (/ExtraLight|UltraLight/gi.test(fontFileName)) return 200;
    if (/Regular|Normal/gi.test(fontFileName)) return 400;
    if (/Medium/gi.test(fontFileName)) return 500;
    if (/SemiBold|DemiBold/gi.test(fontFileName)) return 600;
    if (/ExtraBold|UltraBold/gi.test(fontFileName)) return 800;
    if (/ExtraBlack|UltraBlack/gi.test(fontFileName)) return 950;
    if (/Light/gi.test(fontFileName)) return 300;
    if (/Bold/gi.test(fontFileName)) return 700;
    if (/Black|Heavy/gi.test(fontFileName)) return 900;
    return 400; // По умолчанию обычный вес
  }

  // Получение стиля шрифта
  function getFontStyle(fontFileName) {
    return /Italic/gi.test(fontFileName) ? 'italic' : 'normal';
  }
  return plugins.gulp.src('.');
}
