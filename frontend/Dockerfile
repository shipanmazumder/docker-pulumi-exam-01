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
# COPY --from=build_stage /app/public ./public
COPY --from=build_stage /app/node_modules ./node_modules
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
EXPOSE 3000
CMD ["npm", "start"]