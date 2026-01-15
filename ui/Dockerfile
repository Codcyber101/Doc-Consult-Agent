# Build stage
FROM node:20-slim AS builder

WORKDIR /app

ENV CYPRESS_INSTALL_BINARY=0

COPY package*.json ./
RUN npm install

COPY . .
RUN ./node_modules/.bin/next --version
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]