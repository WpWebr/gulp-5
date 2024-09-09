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
    src: 'src/img/**/*.{jpg,jpeg,png}',    
    minDest: 'src/images',
    dest: `${dest}/images`,
  },
  gifs: {
    src: 'src/img/**/*.gif',
    dest: `${dest}/images`,
  },
  svg: {
    src: 'src/img/svg/**/*.svg',
    spriteSrc: 'src/img/sprite/*.svg',
    spriteDest: 'src/img/sprite',
    dest: `${dest}/images/svg`,
    destSprite: `${dest}/images/sprite`,
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
    scssDest: 'src/scss', // Папка для файла _fonts.scss
    scssFile: '_fonts.scss', // Имя SCSS файла для подключения шрифтов
    dest: `${dest}/fonts`,
  }

}