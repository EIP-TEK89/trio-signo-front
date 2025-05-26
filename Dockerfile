FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --no-cache

COPY . .

RUN npm run build

FROM nginx:1.27.0-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
