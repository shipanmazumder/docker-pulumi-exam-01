FROM node:18-alpine
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package*.json ./
RUN npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]