# Makefile for Docker Compose

# Default environment file path
ENV_FILE=.env

# Target to build and run containers
up:
	@echo "Starting Docker containers with environment file: $(ENV_FILE)"
	@if [ -f $(ENV_FILE) ]; then \
		docker compose --env-file $(ENV_FILE) up -d --build; \
	else \
		echo "Environment file not found at $(ENV_FILE)"; \
		exit 1; \
	fi

# Target to stop containers
down:
	@echo "Stopping Docker containers with environment file: $(ENV_FILE)"
	@if [ -f $(ENV_FILE) ]; then \
		docker compose --env-file $(ENV_FILE) down; \
	else \
		echo "Environment file not found at $(ENV_FILE)"; \
		exit 1; \
	fi

# Target to rebuild without using the cache
rebuild:
	@echo "Rebuilding Docker containers without cache"
	docker compose --env-file $(ENV_FILE) build --no-cache
	docker compose --env-file $(ENV_FILE) up -d

# Target to view logs
logs:
	@echo "Displaying Docker container logs"
	docker logs backend -f

# Target to clean up
clean:
	@echo "Stopping and removing Docker containers, networks, volumes, and images"
	docker compose down --rmi all --volumes --remove-orphans