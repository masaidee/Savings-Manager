# 🚀 Getting Started with Keep

## Prerequisites

- Node.js (v16+)
- Yarn (v3+) or npm

## Quick Setup

### Option 1: Using yarn (Recommended)

```bash
# 1. Install all dependencies
yarn install

# 2. Create .env files (copy from .env.example)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Configure MongoDB connection in backend/.env
# For local: MONGO_URI=mongodb://localhost:27017/keep
# For Atlas: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/keep

# 4. Start development servers
yarn dev
```

### Option 2: Using Make (if you have make installed)

```bash
# View all available commands
make help

# Setup and run
make setup
make dev
```

### Option 3: Using shell scripts directly

```bash
# Setup
bash scripts/setup.sh

# Run development
bash scripts/dev.sh

# Check dependencies
bash scripts/check.sh

# Build for production
bash scripts/build.sh
```

### Option 4: Using Docker for MongoDB

```bash
# Start MongoDB container
docker-compose up -d

# Then run:
yarn install
yarn dev
```

## Running Components Separately

### Backend only
```bash
yarn workspace backend dev
# Runs on http://localhost:5000
```

### Frontend only
```bash
yarn workspace frontend dev
# Runs on http://localhost:5173
```

## Available Yarn Scripts

```bash
yarn install              # Install all dependencies (monorepo)
yarn dev                  # Run backend + frontend together
yarn workspace backend dev    # Run backend only
yarn workspace frontend dev   # Run frontend only
yarn workspace frontend build # Build frontend for production
```

## Project Structure

```
keep/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Business logic
│   │   └── server.js
│   ├── .env             # Configuration (create from .env.example)
│   └── package.json
│
├── frontend/            # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   ├── .env             # Configuration (create from .env.example)
│   └── package.json
│
├── scripts/             # Convenience scripts
├── Makefile             # Make commands
├── docker-compose.yml   # MongoDB container config
├── package.json         # Root monorepo configuration
└── yarn.lock            # Yarn lock file
```

## MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB:
   ```bash
   mongod
   ```
3. MongoDB will be available at `mongodb://localhost:27017/keep`

### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/keep?retryWrites=true&w=majority
   ```

### Option C: Docker Compose

```bash
# Start MongoDB in Docker
docker-compose up -d

# View logs
docker-compose logs -f mongodb

# Stop MongoDB
docker-compose down
```

## Troubleshooting

### Backend won't connect to MongoDB
- Check that MongoDB is running
- Verify connection string in `backend/.env`
- Check firewall settings (if using MongoDB Atlas)

### Port 5000 already in use
- Change PORT in `backend/.env`
- Or kill the process using the port

### Port 5173 already in use
- Vite will automatically try the next port
- Or modify `frontend/vite.config.js`

### Node version error
- Update Node.js to v16+ at https://nodejs.org

### Yarn not installed
```bash
npm install -g yarn
# or
corepack enable yarn  # if using Node 16.9+
```

### CORS errors
- Make sure frontend `.env` has correct API URL
- Make sure backend `.env` has correct CORS_ORIGIN

## API Documentation

### Children Endpoints
- `GET /api/children` - List all children
- `POST /api/children` - Create child
- `GET /api/children/:id` - Get child with transactions
- `PUT /api/children/:id` - Update child
- `DELETE /api/children/:id` - Delete child

### Transaction Endpoints
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Statistics Endpoints
- `GET /api/statistics` - Get dashboard statistics

## Production Deployment

### Frontend
```bash
yarn workspace frontend build
# Upload frontend/dist to Vercel, Netlify, or similar
```

### Backend
- Deploy to Heroku, Railway, AWS, or similar
- Set environment variables on hosting platform
- Ensure MongoDB is accessible from production

## Installing Yarn

If you don't have Yarn installed:

```bash
# Using npm
npm install -g yarn

# Using Homebrew (macOS)
brew install yarn

# Using Chocolatey (Windows)
choco install yarn

# Using corepack (Node.js 16.9+)
corepack enable yarn
```

## Support

For issues or questions, check:
- Backend logs: `yarn workspace backend dev`
- Frontend console: Browser DevTools
- MongoDB connection: `bash scripts/check.sh`
