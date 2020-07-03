FROM node:12.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build:prod


EXPOSE 80
CMD [ "npm", "run", "server:prod" ]