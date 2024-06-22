# Stage 1 : Builder
FROM node:lts-alpine AS builder
WORKDIR /frontend
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# Stage 2: Application
FROM nginx:latest
COPY --from=builder /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
