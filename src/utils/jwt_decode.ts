import jwt_decode from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: any; // Другие свойства токена
}

export const getTokenExpirationDate = (token: string): Date | null => {
  if (!token) return null;

  const decoded = jwt_decode<DecodedToken>(token); // Используйте decode
  if (!decoded.exp) return null;

  return new Date(decoded.exp * 1000); // Преобразуем секунды в миллисекунды
};

export const isTokenExpired = (token: string): boolean => {
  const expirationDate = getTokenExpirationDate(token);
  if (!expirationDate) return true; // Если нет даты истечения, считаем токен просроченным

  return Date.now() >= expirationDate.getTime(); // Сравниваем текущее время с датой истечения
};

// Пример использования
//const token = localStorage.getItem("accessToken");
