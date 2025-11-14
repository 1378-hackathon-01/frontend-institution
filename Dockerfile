FROM node:20-alpine
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json .npmrc ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем production build
RUN npm run build

EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]