FROM node:18 AS dev
WORKDIR /home/node/app
COPY package*.json .
RUN npm i
COPY . .
CMD npm run start