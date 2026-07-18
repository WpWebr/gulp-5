const FaviconDataFile = 'faviconData.json';

function getMasterIconPath() {
  const dir = add.plugins.path.join(add.paths.src, 'images/favicon');
  if (!add.plugins.fs.existsSync(dir)) {
    throw new Error(`Папка с исходным изображением не найдена: ${dir}`);
  }
  const files = add.plugins.fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  if (files.length === 0) {
    throw new Error(`В папке ${dir} нет .png файла`);
  }
  return add.plugins.path.join(dir, files[0]);
}

function getFaviconDest() {
  return add.plugins.path.join(add.paths.src, 'favicons');
}

function getMarkupFilePath() {
  return add.plugins.path.join(getFaviconDest(), FaviconDataFile);
}

export function faviconGenerate(done) {
  const dest = getFaviconDest();
  const markupFile = getMarkupFilePath();

  const settings = {
    path: '/favicons/',
    icon: {
      desktop: {
        darkIconTransformation: {
          type: 'none',
          backgroundColor: '#ffffff',
          backgroundRadius: 0.7,
          imageScale: 0.7,
          brightness: 1
        },
        darkIconType: 'none',
        regularIconTransformation: {
          type: 'background',
          backgroundColor: '#ffffff',
          backgroundRadius: 0.3,
          imageScale: 0.8,
          brightness: 1
        }
      },
      touch: {
        transformation: {
          type: 'background',
          backgroundColor: '#ffffff',
          backgroundRadius: 0,
          imageScale: 0.7,
          brightness: 1
        },
        appTitle: 'LedexPro'
      },
      webAppManifest: {
        transformation: {
          type: 'background',
          backgroundColor: '#ffffff',
          backgroundRadius: 0,
          imageScale: 0.7,
          brightness: 1
        },
        name: 'Светодиодные светильники',
        shortName: 'LedexPro',
        backgroundColor: '#ffffff',
        themeColor: '#ffffff'
      }
    }
  };

  let masterIcon;
  try {
    masterIcon = getMasterIconPath();
  } catch (e) {
    add.plumberError(e.message, 'faviconGenerate');
    done();
    return;
  }

  add.plugins.realFavicon.generateFavicon({
    masterIcon,
    dest,
    settings,
    markupFile
  }, function () {
    try {
      const html = add.plugins.generateFaviconHtml(settings);
      add.plugins.fs.writeFileSync(markupFile, JSON.stringify(html, null, 2), 'utf8');
      const htmlDir = add.plugins.path.join(dest, 'html');
      add.plugins.fs.mkdirSync(htmlDir, { recursive: true });
      add.plugins.fs.writeFileSync(
        add.plugins.path.join(htmlDir, 'favicon.html'),
        html.markups.join('\n'),
        'utf8'
      );
    } catch (e) {
      add.plumberError(`Ошибка при сохранении HTML кода: ${e.message}`, 'faviconGenerate');
    }
    add.plumberError('Готово! Фавиконы сгенерированы.', 'faviconGenerate');
    done();
  });
}

export function faviconCopy(done) {
  const srcDir = getFaviconDest();
  const distDir = add.plugins.path.join(add.paths.dest, 'favicons');

  if (!add.plugins.fs.existsSync(srcDir)) {
    done();
    return;
  }

  return add.plugins.gulp.src([
    `${srcDir}/*.{ico,svg,png,webmanifest}`,
    `!${srcDir}/${FaviconDataFile}`,
  ], { encoding: false })
    .pipe(add.handleError('faviconCopy'))
    .pipe(add.plugins.gulp.dest(distDir));
}

export function faviconInject(done) {
  const markupFile = getMarkupFilePath();

  if (!add.plugins.fs.existsSync(markupFile)) {
    add.plumberError(`Файл данных фавиконов не найден: ${markupFile}. Запустите "gulp favicon"`, 'faviconInject');
    done();
    return;
  }

  const data = JSON.parse(add.plugins.fs.readFileSync(markupFile, 'utf8'));

  return add.plugins.gulp.src(`${add.paths.html.dest}/*.html`)
    .pipe(add.handleError('faviconInject'))
    .pipe(add.plugins.realFavicon.injectFaviconMarkups({
      markups: data.markups,
      cssSelectors: data.cssSelectors
    }))
    .pipe(add.plugins.gulp.dest(add.paths.html.dest));
}
