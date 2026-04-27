require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const planRoutes = require('./src/routes/planRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/plans', planRoutes);

app.get('/', (req, res) => {
  res.send('Food & Health API is running...');
});

const PORT = process.env.PORT || 5000;

// Connect to DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.log('Failed to connect to database. Starting server without DB for testing.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (No DB connected)`);
  });
});
