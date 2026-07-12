const router = require("express").Router();

const taskController = require("../controllers/taskController");
const validateTask = require("../middleware/validateTask");
const authenticateUser = require("../middleware/authenticateUser");

// Get all tasks for a logged-in user
router.get("/",authenticateUser, taskController.getUserTasks);

// Get one task
router.get("/:id", taskController.getTask);

// Create task
router.post("/", authenticateUser, validateTask, taskController.createTask);

// Update task
router.put("/:id", authenticateUser, validateTask, taskController.updateTask);

// Delete task
router.delete("/:id",authenticateUser, taskController.deleteTask);

module.exports = router;