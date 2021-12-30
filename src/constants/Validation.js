const STATUSES = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
};

const ERRORS = {
  UPLOAD_IMAGES_FAIL: 'Не удалось загрузить изображения на сервер',
  GET_DATA_FAIL: 'Не удалось получить данные из базы данных',
};

const VALIDATION_ERRORS = {
  NO_PRICE: 'Не указана цена',
  NO_TITLE: 'Не указан заголовок',
  NO_LOCATION: 'Не указано расположение',
  NO_ADDRESS: 'Не указан адрес',
  SHORT_PRICE: 'Слишком низкая цена',
  SHORT_TITLE: 'Минимальная длина заголовка: 4 символа',
  SHORT_ADDRESS: 'Минимальная длина адреса: 4 символа',
  LONG_PRICE: 'Слишком большая цена',
  LONG_TITLE: 'Максимальная длина заголовка: 100 символов',
  LONG_ADDRESS: 'Максимальная длина адреса: 100 символов',
};

module.exports = {
  STATUSES,
  ERRORS,
  VALIDATION_ERRORS,
};
