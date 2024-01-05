# Stage 1: Build Angular App
FROM node:20.10.0-alpine as builder
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
RUN npm run build-ci

# Stage 2: Setup Nginx
FROM nginx
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/America/Bogota /etc/localtime
COPY --from=builder /app/prod/compile /usr/share/nginx/html
COPY ./prod/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./prod/openssl.cnf /etc/ssl/openssl.cnf
COPY ./certs /etc/nginx/cert
EXPOSE 448
