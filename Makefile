.PHONY: help setup dev dev-backend dev-frontend install build check clean

help:
	@echo "Keep - Children's Savings Management System"
	@echo ""
	@echo "Available commands:"
	@echo "  make setup          - Install all dependencies with yarn"
	@echo "  make dev            - Run both backend and frontend (development)"
	@echo "  make dev-backend    - Run backend only (development)"
	@echo "  make dev-frontend   - Run frontend only (development)"
	@echo "  make build          - Build frontend for production"
	@echo "  make check          - Check if all dependencies are installed"
	@echo "  make clean          - Remove node_modules and build files"
	@echo ""

setup:
	@bash scripts/setup.sh

dev:
	@bash scripts/dev.sh

dev-backend:
	@yarn workspace backend dev

dev-frontend:
	@yarn workspace frontend dev

build:
	@bash scripts/build.sh

check:
	@bash scripts/check.sh

clean:
	@echo "Cleaning up..."
	@rm -rf node_modules backend/node_modules frontend/node_modules
	@rm -rf frontend/dist
	@rm -f yarn.lock
	@echo "✓ Cleanup complete"

.DEFAULT_GOAL := help
