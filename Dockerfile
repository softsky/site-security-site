FROM node

MAINTAINER Arsen A.Gutsal <gutsal.arsen@softsky.com.ua>

# Install app dependencieso
ENV APP_PATH /usr/src
WORKDIR ${APP_PATH}

ENV NODE_PORT 3000
EXPOSE ${NODE_PORT}

COPY package.json .
RUN npm install

COPY app/ app/

CMD [ "npm", "run", "start" ]
