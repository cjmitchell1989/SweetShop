FROM node:14.2.0

WORKDIR /usr/src/app

COPY package.json .
COPY ./src ./src

RUN npm install --production --silent

ENV NODE_ENV='production'

CMD ["node", "./src/"]