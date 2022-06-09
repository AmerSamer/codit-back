const express = require('express');
const TasksController = require('../controllers/tasks.controller')
const { protect } = require("../middleware/auth")
const { protectAdmin } = require("../middleware/authAdmin")
const router = express.Router();

router.post('/newTask', protectAdmin, (req, res) => {
    TasksController.addNewTask(req, res);
})
router.get('/getAllTasks', protect, (req, res) => {
    TasksController.getAllTasks(req, res);
})
router.get('/getEmployeeTasks/:id', protect, (req, res) => {
    TasksController.getEmployeeTasks(req, res);
})
router.put('/startEmployeeTasks/:id', protect, (req, res) => {
    TasksController.startEmployeeTasks(req, res);
})
router.put('/endEmployeeTasks/:id', protect, (req, res) => {
    TasksController.endEmployeeTasks(req, res);
})
router.put('/updateTask/:_id',protectAdmin, (req, res) => {
    TasksController.updateTask(req, res);
})
router.delete('/deleteTask/:id',protectAdmin, (req, res) => {
    TasksController.deleteTask(req, res);
})
module.exports = router;