FROM node:19-alpine3.15 AS dev-deps

WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:19-alpine3.15 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine AS prod
EXPOSE 80
COPY --from=builder /app/dist/encriptacion-frontend-web /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]