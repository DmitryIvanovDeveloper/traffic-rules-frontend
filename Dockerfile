# Node builder
ARG NODE_VERSION=22.11-alpine3.20
FROM node:${NODE_VERSION} AS node-builder
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

WORKDIR /app
COPY package.json .
ENV npm_config_loglevel=error
ENV npm_config_update-notifier=false
RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

COPY . .
RUN yarn build

FROM alpine:3.20 AS optimized-builder
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

RUN set -eux; \
    apk add --no-cache brotli optipng jpegoptim; \
    rm -rf /var/cache/apk/; \
    rm -rf /root/.cache; \
    rm -rf /tmp/*;

WORKDIR /app
COPY --from=node-builder /app/dist/ /app

RUN set -eux; \
    find /app/ \
        -maxdepth 10 \
        -type f \
        -name "*.js" \
        -o -name "*.html" \
        -o -name "*.css" \
        | awk '{ print "\""$0"\""}' \
        | xargs -n 1 gzip -9k || true;

RUN set -eux; \
    find /app/ \
        -maxdepth 10 \
        -type f \
        -name "*.js" \
        -o -name "*.html" \
        -o -name "*.css" \
        | awk '{ print "\""$0"\""}' \
        | xargs -n 1 brotli -Zk || true;

RUN set -eux; \
    find /app/ \
        -maxdepth 10 \
        -type f \
        -name "*.png" \
        | awk '{ print "\""$0"\""}' \
        | xargs -n 1 optipng || true;

RUN set -eux; \
    find /app/ \
        -maxdepth 10 \
        -type f \
        -name "*.jpg" \
        | awk '{ print "\""$0"\""}' \
        | xargs -n 1 jpegoptim --strip-all || true;


FROM registry.gitlab.com/yks/hartiya/lib-ci/master/nginx:alpine3.20
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

USER nginx

WORKDIR /var/www/html
COPY --chown=nginx:nginx --from=optimized-builder  /app /var/www/html

# https://docs.docker.com/reference/dockerfile/#healthcheck
HEALTHCHECK --interval=5s --timeout=2s \
  CMD nc -vz 127.0.0.1 8080 && echo 'true'  || exit 1

EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
