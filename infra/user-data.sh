#!/bin/bash

# Update system packages
apt-get update
apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start Docker service
systemctl start docker
systemctl enable docker

# Add ubuntu user to docker group
usermod -aG docker ubuntu

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create app directory
mkdir -p /app
cd /app

# Create .env file
cat << 'EOF' > .env
DATABASE_URL='mongodb://shipan:shipan@mongo:27017/curi'
DATABASE_HOST="mongo"
DATABASE_NAME="todo"
DATABASE_USER="shipan"
DATABASE_PASSWORD="shipan"
ME_CONFIG_BASICAUTH_USERNAME="shipan"
ME_CONFIG_BASICAUTH_PASSWORD="shipan"
BACKEND_PORT=4000
PORT=3000
NEXT_PUBLIC_API_BASE_URL=http://backend/api 
EOF

# Create docker-compose.yaml
cat << 'EOF' > docker-compose.yaml
services:
  frontend:
    restart: always
    container_name: frontend
    image: shipansm/todo-frontend:latest
    ports:
      - "3000:3000"
    networks:
      - todo
    env_file:
      - ./.env
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://backend:4000
    command: npm start
  backend:
    restart: always
    container_name: backend
    image: shipansm/todo-backend:latest
    ports:
      - "4000:4000"
    networks:
      - todo
    healthcheck:
      test: curl --fail http://localhost:4000/health || exit 1
      interval: 30s
      timeout: 5s
      retries: 2
      start_period: 60s
    env_file:
      - ./.env

  web:
    image: shipansm/todo-web:latest
    container_name: web
    ports:
      - 80:80
    depends_on:
      - backend
    networks:
      - todo

  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --cleanup --interval 150
    networks:
      - todo

networks:
  todo:
    driver: bridge
EOF

# Start containers
docker compose up -d

# Enable docker service on boot
systemctl enable docker