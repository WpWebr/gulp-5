import { dev, build, fonts, svg, fontsStyle, processImages, zip } from './gulp/tasks/tasks.mjs'; // задачи

export { 
  dev,        // Основные задачи с наблюдением
  build,      // Основные задачи
  fonts,      // Шрифт конвертация и стили 
  fontsStyle, // стили шрифтов без конвертации
  svg,         // Отдельная задача для работы со спрайтом SVG
  processImages,
  zip
};

// Задача по умолчанию
export default dev;// Основные задачи и наблюдение