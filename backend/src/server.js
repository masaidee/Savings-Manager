import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Import routes
import childrenRoutes from './routes/children.js';
import transactionsRoutes from './routes/transactions.js';
import statisticsRoutes from './routes/statistics.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
   origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
}));
app.use(express.json());

// Connect to database
connectDB();

// API routes
app.use('/api/children', childrenRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/statistics', statisticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
   res.json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
   });
});

// 404 handler
app.use((req, res) => {
   res.status(404).json({
      success: false,
      message: 'Endpoint not found',
   });
});

// Error handler
app.use((err, req, res, next) => {
   console.error('Error:', err);
   res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
   });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`\n✓ Server running on http://localhost:${PORT}`);
   console.log(`✓ API health check: http://localhost:${PORT}/api/health\n`);
});
