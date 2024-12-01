# Stage 1: Build the application
FROM node:20-alpine AS builder

RUN npm install -g pnpm && \
    npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine AS production

RUN apk add --no-cache curl 

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml


EXPOSE 4000

CMD ["node", "dist/apps/todo/main"]