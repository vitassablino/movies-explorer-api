/* Коды ошибок */
const CREATE_CODE = 201;
const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;

/* Сообщения ошибок */
const CONFLICT_MESSAGE = 'Пользователь с таким email уже существует.';
const SIGNIN_MESSAGE = 'Успешный вход.';
const SIGNOUT_MESSAGE = 'Успешный выход.';
const SIGNUP_BAD_DATA_MESSAGE = 'При регистрации пользователя произошла ошибка.';
const MOVIE_DELETE_MESSAGE = 'Фильм удалён.';
const MOVIE_BAD_DATA_MESSAGE = 'Переданы некорректные данные для добавления фильма в сохранённые.';
const MOVIE_FORBIDDEN_MESSAGE = 'Эта карточка вам не принадлежит';
const MOVIE_DELETE_NOT_FOUND_MESSAGE = 'Фильм с указанным ID не найден';
const MOVIE_FIND_NOT_FOUND_MESSAGE = 'Фильм не найден';
const MOVIE_BAD_ID_MESSAGE = 'Введены неверные данные';
const URL_NOT_FOUND_MESSAGE = 'Запрашиваемая страница не найдена.';
const USER_NOT_FOUND_MESSAGE = 'Пользователь найден.';
const USER_BAD_ID_MESSAGE = 'Передан некорректный ID пользователя.';
const USER_BAD_DATA_MESSAGE = 'При обновлении профиля произошла ошибка.';
const AUTHORIZATION_BAD_DATA_MESSAGE = 'Неверный логин или пароль';
const AUTHORIZATION_NO_TOKEN_MESSAGE = 'Токен не передан или передан не в том формате.';
const AUTHORIZATION_BAD_TOKEN_MESSAGE = 'Переданный токен некорректен.';
const BAD_REQUEST_ERROR_MESSAGE = 'Некорректные данные';


module.exports = {
  CREATE_CODE,
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  CONFLICT_MESSAGE,
  SIGNIN_MESSAGE,
  SIGNOUT_MESSAGE,
  SIGNUP_BAD_DATA_MESSAGE,
  MOVIE_DELETE_MESSAGE,
  MOVIE_BAD_DATA_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
  MOVIE_DELETE_NOT_FOUND_MESSAGE,
  MOVIE_FIND_NOT_FOUND_MESSAGE,
  MOVIE_BAD_ID_MESSAGE,
  URL_NOT_FOUND_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_BAD_ID_MESSAGE,
  USER_BAD_DATA_MESSAGE,
  AUTHORIZATION_BAD_DATA_MESSAGE,
  AUTHORIZATION_NO_TOKEN_MESSAGE,
  AUTHORIZATION_BAD_TOKEN_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE
};