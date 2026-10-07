// Import Express.
// Express is the framework we use to create our backend server
// and define API routes.
import express from 'express';

// Import CORS.
// CORS allows our React Native frontend to communicate
// with this backend.
import cors from 'cors';

// Import dotenv.
// dotenv allows us to read variables stored in our .env file.
import dotenv from 'dotenv';

import mongoose from 'mongoose';

// Load the variables from .env into process.env.
//
// For example, if .env contains:
// PORT=5001
//
// We can access it using:
// process.env.PORT
dotenv.config();


// Create an Express application.
//
// 'app' is the object we will use to configure
// our backend server.
const app = express();


// -------------------- MIDDLEWARE --------------------

// Enable CORS.
//
// This allows requests from our frontend to reach
// the backend.
app.use(cors());


// Tell Express to automatically understand JSON
// data sent in HTTP requests.
//
// For example, the frontend might send:
//
// {
//   "content": "My tomato plants are growing well"
// }
//
// express.json() allows us to access that data through:
// req.body
app.use(express.json());


// -------------------- SERVER CONFIGURATION --------------------

// Get the PORT value from the environment variables.
//
// If .env contains:
// PORT=5001
//
// then process.env.PORT will be "5001".
//
// If PORT isn't defined, use 5001 as the default.
const PORT = process.env.PORT || 5001;


// -------------------- ROUTES --------------------

// Define a GET request for the root URL '/'.
//
// When someone visits:
// http://localhost:5001/
//
// this function will execute.
app.get('/', (req, res) => {

  // Send a JSON response back to whoever made
  // the request.
  res.json({
    message: 'AgriMithra backend is running'
  });
});

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// Comment routes
app.use('/api/comments', commentRoutes);

// Post routes
app.use('/api/posts', postRoutes);

// User routes
app.use('/api/users', userRoutes);


// -------------------- START SERVER --------------------

// Start the Express server and make it listen
// for requests on the specified PORT.
// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI!) // The exclamation mark tells TypeScript: "I promise this value is not null or undefined.". process refers to the environment variables loaded from .env. MONGO_URI is the connection string for MongoDB.

  .then(() => {

    console.log('MongoDB connected successfully');

    // Start the server after MongoDB connects

    app.listen(PORT, () => {
        // This function runs once the server has successfully started.
      console.log(`Server running on port ${PORT}`);

    });

  })

  .catch((error) => {

    console.error('MongoDB connection failed:', error);

  });
