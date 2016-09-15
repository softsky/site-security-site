FROM node

MAINTAINER Arsen A.Gutsal <gutsal.arsen@softsky.com.ua>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencieso
ENV APP_PATH /usr/src/app

COPY package.json ${APP_PATH}
RUN npm install

ENV PORT 3000
EXPOSE 3000

COPY . ${APP_PATH}
WORKDIR ${APP_PATH}

CMD [ "npm", "start" ]
