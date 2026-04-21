#!/bin/bash

echo "🚀 Starting Keep Development Server..."
echo ""
echo "Backend server will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
echo "Starting backend..."
npm run dev:backend &
BACKEND_PID=$!

# Give backend a moment to start
sleep 2

# Start frontend
echo "Starting frontend..."
npm run dev:frontend

# When frontend exits, kill backend too
kill $BACKEND_PID 2>/dev/null
