// Require dependencies
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Express server
const app = express();

// Parse JSON body
app.use(express.json());

// Log requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Start listening to requests
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
