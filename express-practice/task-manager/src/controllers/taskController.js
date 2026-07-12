const Task = require("../models/Tasks");

// ======================
// CREATE TASK
// ======================
exports.createTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const newTask = await Task.create({
            title,
            user: req.user.id
        });

        res.status(201).json(newTask);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// GET TASK BY ID
// ======================
exports.getTask = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id).populate("user");

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// GET ALL TASKS FOR A USER
// ======================
exports.getUserTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            user: req.user.id
        });

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// UPDATE TASK
// ======================
exports.updateTask = async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if(task.user.toString() !== req.user.id){
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        task.title = req.body.title || task.title;

        await task.save();

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ======================
// DELETE TASK
// ======================
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await task.deleteOne();

        res.status(204).send();

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};