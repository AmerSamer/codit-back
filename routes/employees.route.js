const express = require('express');
const employeesController = require('../controllers/employees.controller')
const { protect } = require("../middleware/auth")
const { protectAdmin } = require("../middleware/authAdmin")
const router = express.Router();

router.post('/newEmployee', protectAdmin, (req, res) => {
    employeesController.addNewEmployee(req, res);
})
router.get('/getAllEmployees', protect, (req, res) => {
    employeesController.getAllEmployees(req, res);
})
router.put('/updateEmployee/:_id',protectAdmin, (req, res) => {
    employeesController.updateEmployee(req, res);
})
router.delete('/deleteEmployee/:id',protectAdmin, (req, res) => {
    employeesController.deleteEmployee(req, res);
})
router.get('/getEmployeeDetails/:id', protect, (req, res) => {
    employeesController.getEmployeeDetails(req, res);
})
// router.put('/updateItemStationsData/',protectAdmin, (req, res) => {
//     ordersController.updateItemStationsData(req, res);
// })
// router.put('/updateOrder/:id',protectAdmin, (req, res) => {
//     ordersController.updateOrder(req, res);
// })
module.exports = router;