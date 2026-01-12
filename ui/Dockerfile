FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm config set fetch-retry-maxtimeout 600000
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
