# Используем базовый образ Node.js
FROM node:24.5.0 AS base

# Устанавливаем необходимые пакеты
RUN apt-get update && apt-get install -y libc6-dev && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если он есть)
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект Vite
RUN npm run build

# Создаем финальный образ для запуска приложения
FROM node:24.5.0 AS production

WORKDIR /app

# Копируем только необходимые файлы из предыдущего этапа
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules

# Указываем переменную окружения для запуска приложения
ENV NODE_ENV=production

# Открываем порт, на котором будет работать приложение
EXPOSE 5173

# Команда для запуска приложения
CMD ["npm", "run", "serve"]