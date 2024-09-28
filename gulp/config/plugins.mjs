import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer'; // для css
import cleanCSS from 'gulp-clean-css'; // сжатие css
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer'; // только новые файлы
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import cheerio from 'gulp-cheerio';
import svgSprite from 'gulp-svg-sprite';
import replace from 'gulp-replace';
import path from 'path';
import fs from 'fs';
import { mkdir } from 'fs/promises';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import notifier from 'node-notifier';
import webpack from 'webpack-stream';
import rename from 'gulp-rename'; // переименование файлов
import webpcss from 'gulp-webpcss'; // вывод .webp изображений для css (нужно установить 'webp-converter@2.2.3' )
import cssMediaQueries from 'group-css-media-queries'; // групировка медиа запросов

// import cssMediaQueries from 'gulp-group-css-media-queries'; // групировка медиа запросов
// import cssMediaQueries from 'gulp-css-media-queries-group'; // групировка медиа запросов

import fileInclude from 'gulp-file-include'; // сборка HTML
import htmlmin from 'gulp-htmlmin'           // Сжатие HTML
import pictureHTML from 'gulp-picture-html';  // Контейнер _picture_ для .webp формата картинок
import formatHtml from 'gulp-format-html' // разжатие/форматирование
import versionNumber from 'gulp-version-number';   // Динамическая версия файла для .js, .css
import through2 from 'through2';   // Динамическая версия файла для .js, .css
import zip from 'gulp-zip';   // создание ZIP


const sass = gulpSass(dartSass);
const server = browserSync.create();

export const plugins = {
  gulp,
  sass,
  autoprefixer,
  cleanCSS,
  uglify,
  concat,
  sourcemaps,
  imagemin,
  webp,
  avif,
  newer,
  gulpIf,
  server,
  deleteAsync,
  plumber,
  notify,
  cheerio,
  svgSprite,
  replace,
  path,
  fs,
  mkdir,
  fonter,
  ttf2woff2,
  notifier,
  webpack,
  rename,
  webpcss,
  cssMediaQueries,
  fileInclude,
  htmlmin,
  pictureHTML,
  formatHtml,
  versionNumber,
  through2,
  zip,
};
 