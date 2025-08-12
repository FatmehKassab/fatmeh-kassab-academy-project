FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build --configuration=production
RUN npm install -g http-server
CMD ["http-server", "dist/fatmeh-kassab-academy-project", "-p", "80"]
