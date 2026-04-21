#!/bin/bash

# Install all dependencies
echo "📦 Installing dependencies..."
npm install --prefix backend
npm install --prefix frontend

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create .env files (or copy from .env.example)"
echo "2. Make sure MongoDB is running"
echo "3. Run: npm run dev"
echo ""
