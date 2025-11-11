FROM node:20-alpine
WORKDIR /app
COPY ./build/ ./build/
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]