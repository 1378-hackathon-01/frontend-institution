FROM node:20-alpine
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Адрес API подставляется CRA на этапе сборки (пусто — https://api.studgram.ru)
ARG REACT_APP_API_URL=
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Собираем production build
RUN npm run build

EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]