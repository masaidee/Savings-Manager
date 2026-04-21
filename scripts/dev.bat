@echo off
echo.
echo 🚀 Starting Keep Development Server...
echo.
echo Backend server will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in a new window
start cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start frontend (this will be in the current window)
cd frontend
npm run dev

REM Kill the backend window when frontend exits
taskkill /f /im node.exe 2>nul
