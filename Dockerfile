FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --no-cache

COPY . .

RUN npm run build

FROM alpine
WORKDIR /build
COPY --from=build /usr/src/app/build ./