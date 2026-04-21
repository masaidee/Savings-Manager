#!/bin/bash

echo "🔍 Checking dependencies..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v)
  echo "✓ Node.js: $NODE_VERSION"
else
  echo "✗ Node.js not found. Please install Node.js"
  exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm -v)
  echo "✓ npm: $NPM_VERSION"
else
  echo "✗ npm not found. Please install npm"
  exit 1
fi

# Check node_modules
if [ -d "node_modules" ]; then
  echo "✓ Dependencies installed"
else
  echo "✗ Dependencies not installed. Run: yarn install"
fi

echo ""
echo "Checking MongoDB connection..."

# Try to connect to MongoDB (default local)
if command -v mongo &> /dev/null; then
  if mongo --eval "db.adminCommand('ping')" &>/dev/null; then
    echo "✓ MongoDB is running locally"
  else
    echo "⚠ MongoDB is not responding on localhost:27017"
    echo "  Make sure MongoDB is running or update MONGO_URI in backend/.env"
  fi
else
  echo "⚠ MongoDB CLI not found. If using MongoDB Atlas, make sure connection string is correct in backend/.env"
fi

echo ""
echo "✅ Dependencies check complete!"
