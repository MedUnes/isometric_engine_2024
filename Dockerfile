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

# nextjs user setup
RUN groupmod -g 1001 node && \
    usermod -u 1001 node && \
    useradd --create-home --shell /bin/bash nextjs && \
    usermod -u $USER_ID nextjs && \
    passwd nextjs -d && \
    usermod -aG nextjs root && \
    usermod -aG nextjs node && \
    chown -R nextjs:node /app

RUN set -ex; \
    echo "PS1='\h:\w\$ '" >> /etc/bash.bashrc; \
    echo "alias ls='ls --color=auto'" >> /etc/bash.bashrc; \
    echo "alias grep='grep --color=auto'" >> /etc/bash.bashrc;

# Don't require a password for sudo
RUN echo "nextjs ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
COPY ./ /app
RUN corepack enable

EXPOSE ${NODE_PORT}
STOPSIGNAL SIGQUIT
