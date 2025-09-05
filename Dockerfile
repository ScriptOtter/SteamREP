FROM node:24.5.0 AS base

RUN apt-get update && apt-get install -y libc6-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm run build

EXPOSE 5173

CMD ['npm', "run", 'build']