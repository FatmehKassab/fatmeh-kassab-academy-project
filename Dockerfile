FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build -- --configuration production
EXPOSE 80
CMD ["npm", "start"]








