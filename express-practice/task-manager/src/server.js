require("dotenv").config();

// Import the Express framework
const express = require("express");

const cors = require("cors");

// Import all task-related routes from the routes folder
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

// Import custom error-handling middleware
const errorHandler = require("./middleware/errorHandler");

const connectDB = require("./config/db");


// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON request bodies
// Allows access to JSON data through req.body
app.use(express.json());

// allow frontend in development
app.use(cors({
    // prod and dev links
    origin: process.env.FRONTEND_URL || "http://localhost:5173/",
}));

// Mount task routes under the "/api/tasks" path
// Example:
// GET /api/tasks
// POST /api/tasks
app.use("/api/tasks", taskRoutes);

app.use("/api/", userRoutes);

// Register the global error-handling middleware
app.use(errorHandler);

// Define the port number the server will listen on
const PORT = 3000;

// Start the server and listen for incoming requests
const startServer = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => {
            // Log a message to the console when the server starts
            console.log(`Server running on port ${PORT}`);
        });
    } catch(error){
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();