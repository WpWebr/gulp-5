import { plugins } from '../config/plugins.mjs';

// обработка для .pipe
export function handleError(task) {
  return plugins.plumber({
    errorHandler: plugins.notify.onError({
      title: `${task} Error`,
      message: '<%= error.message %>',
      sound: 'Basso'
    })
  });
}
// Обработка ошибок console и Windows
export function plumberError(message, title = 'Error') {
  const addError = { 
    title: title,
    message: message,
    sound: true
  }
  plugins.gulp.src('.')
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError(addError)
    }))
    // Также показываем одноразовое уведомление
    .pipe(plugins.notify(addError));
}
// c помощью node-notifier
export function notifierError(message, title = 'Error') {
  console.error(`${title}: ${message}`);
  // Уведомление через Windows
  plugins.notifier.notify({
    title: title,
    message: message,
    sound: true, // Воспроизведение звука при уведомлении
  });
}