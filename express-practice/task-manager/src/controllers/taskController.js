const express = require("express");
const router = express.Router();

// Import the tasks array from the data folder.
// This acts as our temporary in-memory database.
const tasks = require("../data/tasks");


// ======================
// CREATE A NEW TASK
// ======================
router.post("/",  (req,res) => {
    try {
        // Extract the title from the request body
        // Example: { "title": "Learn Express" }
        const { title } = req.body;

        // Validate that a title was provided
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        // Create a new task object
        const newTask = {
            // Generate a unique ID using the current timestamp
            id: Date.now().toString(),

            // Store the provided title
            title
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Return the newly created task with HTTP status 201 (Created)
        res.status(201).json(newTask);

    } catch (error) {
        // Pass unexpected errors to the global error handler
        res.status(400).json(error);
    }
});


// ======================
// GET TASK BY ID
// ======================

router.get("/:id",  (req,res) => {
    try{
    // Search for a task whose ID matches the ID in the URL
    // Example: GET /api/tasks/123
    const task = tasks.find(
        (task) => task.id === req.params.id
    );

    // If no task is found, return an error
    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    // Return the task data
    res.status(200).json(task);

} catch (error) {
    // Pass errors to the error-handling middleware
    res.status(400).json(error);
}
});

// ======================
// UPDATE TASK
// ======================

router.put("/:id",  (req,res) => {
    try{
        // Find the task using the ID from the URL
        const task = tasks.find(
            (task) => task.id === req.params.id
        );

        // If task doesn't exist, return 404
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // Get the updated title from the request body
        const { title } = req.body;

        // Ensure a title was provided
        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        // Update the task title
        task.title = title;

        // Return the updated task
        res.status(200).json(task);

    } catch (error) {
        // Forward errors to the global error handler
        res.status(400).json(error);
    }
});

// ======================
// DELETE TASK
// ======================
router.delete("/:id",  (req, res) => {
    try {
        // Find the index of the task in the array
        const index = tasks.findIndex(
            (task) => task.id === req.params.id
        );

        // If task isn't found, findIndex returns -1
        if (index === -1) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // Remove the task from the array
        // splice(startIndex, numberOfItemsToRemove)
        tasks.splice(index, 1);

        // Return 204 (No Content) to indicate successful deletion
        res.status(204).send();

    } catch (error) {
        // Pass any unexpected errors to the error handler
        res.status(400).json(error);
    }
});