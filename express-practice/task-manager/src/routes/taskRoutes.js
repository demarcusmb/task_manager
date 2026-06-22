const express = require("express");

const{
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask = express
} = require("../controllers/taskController");

const validateTask = require("../middleware/validateTask");

const router = express.Router();

router.post("/", createTask);

router.get("/", getAllTasks);

router.get("/", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.post("/", validateTask, createTask);

router.put("/:id", validateTask, updateTask);

module.exports = router;
