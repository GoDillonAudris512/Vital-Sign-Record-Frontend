FROM node:lts-alpine AS builder
WORKDIR /frontend

COPY . .
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
