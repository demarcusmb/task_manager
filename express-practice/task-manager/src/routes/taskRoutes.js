const router = require("express").Router();

const Task = require("../models/Tasks")
const validateTask = require("../middleware/validateTask");

router.get("/", async(req,res)=> {
    try{
        const tasks = await Task.find();
        // Return the array of tasks
        res.status(200).json(tasks);
    } catch(error) {
        res.status(500).json(error);
    }
});

// ======================
// GET TASK BY ID (Fixed path from "/" to "/:id")
// ======================
router.get("/:id",  async (req, res) => {
    try {
        // Search for a task whose ID matches the ID in the URL
        const task = await Task.findById(req.params.id);

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
router.delete("/:id", async  (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post("/", validateTask, async (req, res) => {
    try {
        const { title } = req.body;

        const newTask = await Task.create({
            title
        });

        // CRITICAL: Send the response back to ATAC!
        return res.status(201).json(newTask);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// ======================
// UPDATE TASK
// ======================
router.put("/:id", validateTask, async (req, res) => {
    try {

        const { title } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title },
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
