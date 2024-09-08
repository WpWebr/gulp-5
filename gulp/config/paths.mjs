import { setings } from './setings.mjs';

const dest = setings.dest; // папка с результатами

export const paths = {
  dest: dest,
  styles: {
    src: 'src/scss/**/*.scss',
    dest: `${dest}/css`,
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: `${dest}/js`,
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png}',
    dest: `${dest}/images`,
    minDest: 'src/imagemin',
  },
  gifs: {
    src: 'src/images/**/*.gif',
    dest: `${dest}/images`,
  },
  svg: {
    src: 'src/images/svg/**/*.svg',
    spriteSrc: 'src/images/sprite/*.svg',
    spriteDest: 'src/images/sprite',
    dest: `${dest}/images/svg`,
  },
  files: {
    src: 'src/files/**/*',
    dest: `${dest}/files`,
  },
  html: {
    src: 'src/**/*.html',
    dest: `${dest}`,
  },
  htmlIncludes: {
    src: 'src/html/**/*.html',
    dest: `${dest}`,
  },
  fonts: {
    src: 'src/fonts',
    src_woff: 'src/fonts/fonts_woff',
    dest: `${dest}/fonts`,
    scssDest: 'src/scss', // Папка для файла _fonts.scss
    scssFile: '_fonts.scss', // Имя SCSS файла для подключения шрифтов
  }

}