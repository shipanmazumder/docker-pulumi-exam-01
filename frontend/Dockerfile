# Build Stage
FROM node:20-alpine AS build_stage

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN apk add --no-cache openssh-client 
RUN apk add --no-cache openssl

RUN npm install -g pnpm

WORKDIR /app
COPY package*.json ./
RUN pnpm install

# Copy environment file and source code
COPY .env ./
COPY . ./

RUN pnpm run build

# Production Stage
FROM node:20-alpine AS production_stage

# Install pnpm in the production stage
RUN npm install -g pnpm

ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app
COPY --from=build_stage /app/package*.json ./
COPY --from=build_stage /app/.next ./.next
COPY --from=build_stage /app/node_modules ./node_modules
COPY --from=build_stage /app/.env ./.env
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]
