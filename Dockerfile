FROM node

MAINTAINER Arsen A.Gutsal <gutsal.arsen@softsky.com.ua>

# Install app dependencieso
ENV APP_PATH /usr/src
WORKDIR ${APP_PATH}

ENV NODE_PORT 3000
EXPOSE ${NODE_PORT}

COPY package.json /tmp
COPY Gruntfile.js /tmp
ADD app /tmp/app
RUN cd /tmp && ls -la /tmp/ && npm install && npm install -g grunt-cli && grunt dist && npm uninstall -g grunt-cli && mv /tmp/node_modules /tmp/dist/ && mv /tmp/dist/* ${APP_PATH}


#CMD [ "npm", "run", "start" ]
CMD [ "node", "/usr/src/app/app.js" ]
