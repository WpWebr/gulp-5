// import { setings } from '../setings/setings.mjs';
import { setFolders } from './setings_folders.mjs'; // папки текущего проекта

const prodject = `${setFolders.allprojects}/${setFolders.name}`;// текущий проект
const src = `${prodject}/src` // папка с исходниками
// const dest = `${prodject}/${setings.dest}`; // папка с результатами
const dest = `${prodject}/dist`; // папка с результатами

const spriteName = 'sprite.svg'; // название спрайта

export const paths = {
  prodject,// текущий проект
  allProdjects: setFolders.allprojects,// текущие проекты
  allSources: setFolders.allSources,// отсюда копируем sources
  sources: setFolders.sources,// копируемый проект
  dest,// теукущие результататы 
  src,// теукущие исходники
  setings: `${prodject}/setings/setings.mjs`,// настройки
  ftp: `${prodject}/setings/ftp.mjs`,// настройки ftp
  spriteName,
  styles: {
    src: `${src}/scss/style.scss`,
    watch: `${src}/scss/**/*.scss`,
    dest: `${dest}/css`,
  }, 
  scripts: {
    src: `${src}/js/app.js`,
    watch: `${src}/js/**/*.{mjs,js}`,
    dest: `${dest}/js`,
  },
  images: {
    src: `${src}/images/**/*.{jpg,jpeg,png}`,    
    minDest: `${src}/aa/img`,
    imgMin: `${src}/aa/img_min`,
    imgMinSrc: `${src}/aa/img_min/**/*`,
    srcDest: `${src}/aa/img/**/*`,
    dest: `${dest}/images`,
  },
  gifs: {
    src: `${src}/images/**/*.gif`,
    dest: `${dest}/images`,
  },
  svg: {
    src: `${src}/images/svg/**/*.svg`,
    srcFolder: `${src}/images/svg/`,
    spriteSrc: `${src}/images/sprite/*.svg`,
    spriteDest: `${src}/images/sprite`,
    // sprite: `${src}/images/sprite/sprite/${setings.spriteName}`,
    sprite: `${src}/images/sprite/sprite/${spriteName}`,
    // sprite: `${src}/images/sprite/sprite/sprite.svg`,
    dest: `${dest}/images/svg`,
    destSprite: `${dest}/images/sprite`,
  },
  files: {
    src: `${src}/files/**/*`,
    robots: `${src}/_robots/robots.txt`,
    dest: `${dest}/files`,
  },
  robots: {
    src: `${src}/_robots/robots.txt`,
  },
  html: {
    src: `${src}/*.html`,
    watch: `${src}/**/*.html`,
    dest: `${dest}`,
  },
  // htmlIncludes: {
  //   src: `${src}/html/**/*.html`,
  //   dest: `${dest}`,
  // },
  fonts: {
    src: `${src}/fonts`,
    src_woff: `${src}/fonts/fonts_woff`,    
    scssDest: `${src}/scss`, // Папка для файла _fonts.scss
    scssFile: `_fonts.scss`, // Имя SCSS файла для подключения шрифтов
    dest: `${dest}/fonts`,
  }

}