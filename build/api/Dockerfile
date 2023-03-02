# [ Stage 1 ] - install node modules
FROM node:12.18-alpine as builder

WORKDIR /build/app

RUN npm i -g @nestjs/cli@7.4.1

COPY ./app/api .
RUN npm install 

ENV NODE_ENV=production
RUN nest build



# ============================
# ============================

# [ Stage 2 ] 
FROM node:12.18-alpine
LABEL maintainer="Anthony Mineo <anthonymineo@gmail.com>"

RUN apk update && apk add --no-cache openssl bash curl

# Default envs as prod
ENV HOST=0.0.0.0 \
    PORT=8443 \
    NODE_ENV=production \
    APP_NAME=NestJS

ENV APP_URL=https://${HOST}:${PORT}


# Setup pm2 as our node process manager
# https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
RUN npm i -g pm2 @nestjs/cli@7.4.1

RUN mkdir /opt/node_app && chown node:node /opt/node_app && mkdir /localcert && chown node:node /localcert
RUN mkdir -p /opt/node_app/app/node_modules/ && chown node:node /opt/node_app/app/node_modules/

WORKDIR /opt/node_app

#USER node

# Generate a localhost cert
RUN openssl req -newkey rsa:2048 -new -nodes -x509 -days 360 -keyout /localcert/key.pem -out /localcert/cert.pem -subj "/C=US/ST=New Jersey/L=Warren/O=localhost/OU=IT/CN=127.0.0.1"


ENV PATH /opt/node_app/node_modules/.bin:$PATH

# Our App
WORKDIR /opt/node_app/app

# Set node modules outside our app to keep it clean
COPY --from=builder /build/app/node_modules/ /opt/node_app/node_modules/

COPY --from=builder /build/app/dist/ /opt/node_app/app/dist/

COPY ./app/api/package.json ./app/api/package-lock.json* ./


# Start script and config
COPY ./build/api/ecosystem._PROD_.config.js  /opt/node_app/ecosystem._PROD_.config.js
COPY ./build/api/entrypoint.sh /entrypoint.sh

EXPOSE 8080 8443

HEALTHCHECK --interval=20s --timeout=30s --start-period=5s --retries=5 \
    CMD curl -f -k https://localhost:8443/ || exit 1

ENTRYPOINT [ "/entrypoint.sh" ]