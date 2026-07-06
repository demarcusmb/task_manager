const express = require("express");
const router = express.Router();

const Task = require("../models/Tasks");

// ======================
// CREATE A NEW TASK
// ======================
router.post("/", async (req,res) => {
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
        const newTask = await Task.create ({
            // Store the provided title
            title
        });

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

router.get("/:id", async (req,res) => {
    try{
    // Search for a task whose ID matches the ID in the URL
    // Example: GET /api/tasks/123
    const task = await Task.findById(req.params.id);

    // If no task is found, return an error
    if (!task) {
        return res.status(404).json({
            message: "Task123 not found",
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

router.put("/:id", async (req,res) => {
    try{
        // Get the updated title from the request body
        const { title } = req.body;

        // Ensure a title was provided
        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        // Update the task title
        const task = await Task.findByIdAndUpdate(
           req.params.id,
            { title },
            {
                new: true, // Return updated document
                runValidators: true // applies schema validation
            }
        );

        //Checks if task exist if not returns not found
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        // Return the updated task
        res.status(200).json(task);

    } catch (error) {
        // Forward errors to the global error handler
        res.status(500).json(error);
    }
});

// ======================
// DELETE TASK
// ======================
router.delete("/:id", async (req, res) => {
    try {
        // Find the index of the task in the array
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) {
            return res.status(404).json({
                message:"Task not found"
            });
        }

        // Return 204 (No Content) to indicate successful deletion
        res.status(204).send();

    } catch (error) {
        // Pass any unexpected errors to the error handler
        res.status(500).json(error);
    }
});