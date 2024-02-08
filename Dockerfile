FROM node:18-alpine AS dev
WORKDIR /home/node/app
COPY package*.json .
RUN npm i
COPY . .
CMD npm run start