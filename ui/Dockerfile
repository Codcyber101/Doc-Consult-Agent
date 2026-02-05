# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
