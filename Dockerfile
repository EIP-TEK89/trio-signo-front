FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --no-cache

COPY . .

RUN npm run build

FROM nginx:stable-alpine

# Copy the built app to nginx html directory
# This project is configured to output to 'build' directory in vite.config.ts
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a healthcheck for the container
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:4000/ || exit 1

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
