# Stage 1: Build Angular App
FROM node:20.10.0-alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20.10.0-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 2: Setup Nginx
FROM nginx as prod
EXPOSE 448
COPY --from=builder /app/dist/digizone-frontend /usr/share/nginx/html
COPY prod/default.conf /etc/nginx/conf.d/default.conf
COPY ./prod/openssl.cnf /etc/ssl/openssl.cnf
COPY ./prod/certs /etc/nginx/cert
COPY ./prod/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx","-g","daemon off;"]

