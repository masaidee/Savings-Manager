# Keep - Children's Savings Management System

A MERN stack web application designed to help teachers track and manage children's savings, promoting financial literacy and healthy saving habits.

## Features

- 📊 **Savings Tracking** - Record deposits and withdrawals for each child
- 📈 **Balance Management** - Automatic balance calculation and history
- 📋 **Transaction History** - Detailed records of all transactions
- 📉 **Dashboard & Reports** - Summary statistics and class-wide insights

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Project Structure

```
keep/
├── frontend/          # React application
├── backend/           # Node.js/Express API
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd keep
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5000`

## API Documentation

### Children Endpoints
- `GET /api/children` - List all children
- `POST /api/children` - Create a new child
- `GET /api/children/:id` - Get child details
- `PUT /api/children/:id` - Update child
- `DELETE /api/children/:id` - Delete child

### Transaction Endpoints
- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Record a transaction
- `GET /api/transactions/:childId` - Get child's transactions

### Statistics Endpoints
- `GET /api/statistics` - Get class-wide statistics

## Development

- Backend runs on port 5000 (configurable via .env)
- Frontend runs on port 5173 (Vite default)
- Hot reload enabled for both frontend and backend

## License

MIT
