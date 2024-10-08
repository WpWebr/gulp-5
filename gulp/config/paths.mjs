import { setings } from './setings.mjs';

const src = `${setings.allprojects}/${setings.name}/src` // папка с исходниками

const dest = `${setings.allprojects}/${setings.name}/${setings.dest}`; // папка с результатами

export const paths = {
  prodject: `${setings.allprojects}/${setings.name}`,
  allProdjects: setings.allprojects,
  allSources: setings.allSources,
  sources: setings.sources,
  dest: dest,
  src: src,
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
    sprite: `${src}/images/sprite/sprite/${setings.spriteName}`,
    dest: `${dest}/images/svg`,
    destSprite: `${dest}/images/sprite`,
  },
  files: {
    src: `${src}/files/**/*`,
    dest: `${dest}/files`,
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