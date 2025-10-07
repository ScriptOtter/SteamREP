import { refreshToken } from "@/data/getUser";
import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL;

// Создаем экземпляр axios
export const createApi = (dispatch: any) => {
  const api = axios.create({
    baseURL: URL, // Укажите ваш базовый URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Добавляем интерсептор для обработки ошибок
  //console.log("Запрос отрравлен!");
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Проверяем, что ошибка связана с истекшим токеном (например, статус 401)
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Устанавливаем флаг, чтобы не зациклиться

        try {
          await refreshToken(dispatch);

          // Повторяем оригинальный запрос с новым токеном
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      // Если это не ошибка 401 или обновление токена не удалось, выводим сообщение в консоль
      console.error("Ошибка запроса:", error);
      return Promise.reject(error);
    }
  );

  return api;
};
