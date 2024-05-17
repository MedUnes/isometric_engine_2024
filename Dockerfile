FROM node:lts-alpine

ARG NODE_PORT
ARG USER_ID=1000

ENV TZ="Europe/Berlin"
ENV LC_ALL="C.UTF-8"
ENV LANG="C.UTF-8"
ENV PORT: ${NODE_PORT}

RUN mkdir -p /app

# Setup common linux tools
RUN apk --update --no-cache add git curl nano bash shadow sudo libc6-compat

COPY ./ /app
RUN corepack enable

EXPOSE ${NODE_PORT}
STOPSIGNAL SIGQUIT
