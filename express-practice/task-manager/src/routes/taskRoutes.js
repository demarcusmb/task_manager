const router = require("express").Router();

const tasks = require("../data/tasks");
const validateTask = require("../middleware/validateTask");

router.get("/", (req,res)=> {
    try{
        // Return the array of tasks
        res.status(200).json(tasks);
    } catch(error) {
        res.status(400).json(error);
    }
});

// ======================
// GET TASK BY ID (Fixed path from "/" to "/:id")
// ======================
router.get("/:id",  (req, res) => {
    try {
        // Search for a task whose ID matches the ID in the URL
        const task = tasks.find(
            (task) => task.id === req.params.id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ======================
// DELETE TASK
// ======================
router.delete("/:id",  (req, res) => {
    try {
        const index = tasks.findIndex(
            (task) => task.id === req.params.id
        );

        if (index === -1) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        tasks.splice(index, 1);
        res.status(204).send();

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post("/", validateTask, (req, res) => {
    try {
        const { title } = req.body;

        const newTask = {
            id: Date.now().toString(),
            title
        };

        // 1. Add the new task to your data array
        tasks.push(newTask);

        // 2. CRITICAL: Send the response back to ATAC!
        return res.status(201).json(newTask);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// ======================
// UPDATE TASK
// ======================
router.put("/:id", validateTask,  (req, res) => {
    try {
        const task = tasks.find((task) => task.id === req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { title } = req.body;
        task.title = title;

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
