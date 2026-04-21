#!/bin/bash

echo "🔨 Building for production..."
echo ""

echo "Building frontend..."
npm run build --prefix frontend

if [ $? -ne 0 ]; then
  echo "❌ Frontend build failed"
  exit 1
fi

echo "✅ Build complete!"
echo ""
echo "Frontend build output in: frontend/dist"
echo "Next steps:"
echo "1. Deploy frontend/dist to a static host (Vercel, Netlify, etc.)"
echo "2. Deploy backend to a server (Heroku, Railway, AWS, etc.)"
