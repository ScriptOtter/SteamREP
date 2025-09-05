FROM node:24.5.0 AS base

RUN apt-get update && apt-get install -y libc6-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /dist

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
