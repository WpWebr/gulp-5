# Генерация фавиконов

## 1. Подготовка

Положите исходное изображение в папку:

```
assets/src/images/favicon/*.png
```

Требования:
- Формат: PNG
- Размер: не менее 512×512px (рекомендуется 512×512)
- Имя файла любое (используется первый найденный `.png`)

## 2. Генерация

```bash
gulp favicon
```

Создаёт в `assets/src/favicons/`:
- `favicon.ico` — для браузеров
- `favicon.svg` — векторная иконка
- `favicon-96x96.png` — PNG-иконка
- `apple-touch-icon.png` — для iOS
- `site.webmanifest` — манифест PWA
- `web-app-manifest-*.png` — иконки для PWA
- `html/favicon.html` — HTML-теги для вставки в `<head>`
- `faviconData.json` — служебный файл для автоматической вставки при сборке

## 3. Автоматическая вставка при сборке

При `gulp build` или `gulp dev`:
1. Файлы фавиконов копируются в `assets/dist/favicons/`
2. HTML-разметка автоматически вставляется во все `.html` в `<head>`

Если `gulp favicon` не был запущен перед сборкой, фавиконы не скопируются и разметка не будет вставлена — сборка завершится без ошибок.

## 4. Настройка дизайна

Параметры генерации находятся в `gulp/tasks/favicon.mjs` в объекте `settings`:

- **`desktop`** — иконка для десктопных браузеров (favicon.ico, favicon.svg, favicon-96x96.png)
- **`touch`** — иконка для iOS (apple-touch-icon.png)
- **`webAppManifest`** — настройки PWA-манифеста

Для изменения дизайна используйте [RealFaviconGenerator](https://realfavicongenerator.net/favicon/gulp) — получите готовый объект настроек и замените `settings` в файле.
