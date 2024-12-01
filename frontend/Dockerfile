# Build Stage
FROM node:18-alpine AS build_stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpm run build


# Production Stage
FROM node:18-alpine AS production_stage

RUN npm install -g pnpm

ENV NODE_OPTIONS="--max-old-space-size=4096"
WORKDIR /app
COPY --from=build_stage /app/package*.json ./
COPY --from=build_stage /app/.next ./.next
COPY --from=build_stage /app/node_modules ./node_modules


EXPOSE 3000

CMD ["npm", "start"]