.PHONY: up down logs build ps shell

# Guardrail: Ensure this is run from the infra directory context
# Docker Compose will naturally use the current directory name as the project name
# or use the one specified in .env if it exists.

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

build:
	docker compose build

ps:
	docker compose ps

# Helper to run a shell in a service (e.g. make shell SERVICE=backend)
shell:
	docker compose exec $(SERVICE) /bin/sh
