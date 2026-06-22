// Import the Express framework
const express = require("express");

// Import all task-related routes from the routes folder
const taskRoutes = require("./routes/taskRoutes");

// Import custom error-handling middleware
const errorHandler = require("./middleware/errorHandler");

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON request bodies
// Allows access to JSON data through req.body
app.use(express.json());

// Mount task routes under the "/api/tasks" path
// Example:
// GET /api/tasks
// POST /api/tasks
app.use("/api/tasks", taskRoutes);

// Register the global error-handling middleware
app.use(errorHandler);

// Define the port number the server will listen on
const PORT = 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    // Log a message to the console when the server starts
    console.log(`Server running on port ${PORT}`);
});