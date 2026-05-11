import { plugins } from '../config/plugins.mjs';

export function favicon() {

  // File where the favicon markups are stored
  const FaviconDataFile = 'faviconData.json';

  // Generate the icons.
  add.plugins.gulp.task('generate-favicon', function (done) {
    add.plugins.realFavicon.generateFavicon({
      masterPicture: '<your master image>',
      dest: '<icons output directory>',
      iconsPath: '/favicons/',
      design: {
        "desktop": {
          "darkIconTransformation": {
            "type": "none",
            "backgroundColor": "#ffffff",
            "backgroundRadius": 0.7,
            "imageScale": 0.7,
            "brightness": 1
          },
          "darkIconType": "none",
          "regularIconTransformation": {
            "type": "background",
            "backgroundColor": "#ffffff",
            "backgroundRadius": 0.3,
            "imageScale": 0.8,
            "brightness": 1
          }
        },
        "touch": {
          "transformation": {
            "type": "background",
            "backgroundColor": "#ffffff",
            "backgroundRadius": 0,
            "imageScale": 0.7,
            "brightness": 1
          },
          "appTitle": "LedexPro"
        },
        "webAppManifest": {
          "transformation": {
            "type": "background",
            "backgroundColor": "#ffffff",
            "backgroundRadius": 0,
            "imageScale": 0.7,
            "brightness": 1
          },
          "name": "Светодиодные светильники",
          "shortName": "LedexPro",
          "backgroundColor": "#ffffff",
          "themeColor": "#ffffff"
        }
      },
      markupFile: FaviconDataFile
    }, function () {
      done();
    });
  });

  // Внедрите разметку favicon в ваши HTML-страницы. Эту задачу следует запускать
  // всякий раз, когда вы изменяете страницу. Вы можете оставить эту задачу
  // как есть или переработать существующий конвейер обработки HTML.
  add.plugins.gulp.task('inject-favicon-markups', function () {
    return add.plugins.gulp.src(['<your HTML files...>'])
      .pipe(add.plugins.realFavicon.injectFaviconMarkups(JSON.parse(add.plugins.gulp.fs.readFileSync(FaviconDataFile)).favicon.html_code))
      .pipe(add.plugins.gulp.dest('{htmlDir}'));
  });

}




// // Предложенный код:
// var realFavicon = require('@realfavicongenerator/gulp-real-favicon');
// var fs = require('fs');

// // File where the favicon markups are stored
// var FaviconDataFile = 'faviconData.json';

// // Generate the icons.
// gulp.task('generate-favicon', function (done) {
//   realFavicon.generateFavicon({
//     masterPicture: '<your master image>',
//     dest: '<icons output directory>',
//     iconsPath: '/favicons/',
//     design: {
//       "desktop": {
//         "darkIconTransformation": {
//           "type": "none",
//           "backgroundColor": "#ffffff",
//           "backgroundRadius": 0.7,
//           "imageScale": 0.7,
//           "brightness": 1
//         },
//         "darkIconType": "none",
//         "regularIconTransformation": {
//           "type": "background",
//           "backgroundColor": "#ffffff",
//           "backgroundRadius": 0.3,
//           "imageScale": 0.8,
//           "brightness": 1
//         }
//       },
//       "touch": {
//         "transformation": {
//           "type": "background",
//           "backgroundColor": "#ffffff",
//           "backgroundRadius": 0,
//           "imageScale": 0.7,
//           "brightness": 1
//         },
//         "appTitle": "LedexPro"
//       },
//       "webAppManifest": {
//         "transformation": {
//           "type": "background",
//           "backgroundColor": "#ffffff",
//           "backgroundRadius": 0,
//           "imageScale": 0.7,
//           "brightness": 1
//         },
//         "name": "Светодиодные светильники",
//         "shortName": "LedexPro",
//         "backgroundColor": "#ffffff",
//         "themeColor": "#ffffff"
//       }
//     },
//     markupFile: FaviconDataFile
//   }, function () {
//     done();
//   });
// });

// // Inject the favicon markups in your HTML pages. You should run
// // this task whenever you modify a page. You can keep this task
// // as is or refactor your existing HTML pipeline.
// gulp.task('inject-favicon-markups', function () {
//   return gulp.src(['<your HTML files...>'])
//     .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FaviconDataFile)).favicon.html_code))
//     .pipe(gulp.dest('{htmlDir}'));
// });