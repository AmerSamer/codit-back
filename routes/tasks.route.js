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
// router.put('/updateEmployee/:_id',protectAdmin, (req, res) => {
//     employeesController.updateEmployee(req, res);
// })
// router.delete('/deleteEmployee/:id',protectAdmin, (req, res) => {
//     employeesController.deleteEmployee(req, res);
// })
module.exports = router;