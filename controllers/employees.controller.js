const employeesModel = require('../models/employees.model');
const tasksModel = require('../models/tasks.model');

const addNewEmployee = async (req, res) => {
    const { id, fullName, email, phoneNumber, address, joinDate } = req.body;
    const idExists = await employeesModel.Employee.findOne({ id: id });
    if (!idExists) {
        const newEmployee = new employeesModel.Employee({
            id: id,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            joinDate: joinDate
        })
        newEmployee.save((err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    } else {
        return res.status(400).json({ error: "Not Valid." });
    }
}
const getAllEmployees = async (req, res) => {
    const data = await employeesModel.Employee.find({})
    return res.status(200).json(data)
}
const updateEmployee = async (req, res) => {
    const { _id } = req.params;
    const { id, fullName, email, phoneNumber, address } = req.body;
    const idExists = await employeesModel.Employee.findById({ _id: _id })
    if (idExists) {
        employeesModel.Employee.findByIdAndUpdate({ _id: _id }, {
            id: id ? id : idExists.id, fullName: fullName ? fullName : idExists.fullName,
            email: email ? email : idExists.email, phoneNumber: phoneNumber ? phoneNumber : idExists.phoneNumber, address: address ? address : idExists.address
        }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    } else {
        return res.status(404).send("Employee Not Exist");
    }
}
const deleteEmployee = (req, res) => {
    const { id } = req.params;
    employeesModel.Employee.findByIdAndDelete(id, async (err, data) => {
        if (err) return res.status(404).send(err);
        await tasksModel.Task.updateMany(
            {},
            { $pull: { assign: { id: id } } }
        )
        return res.status(200).send(data);
    });
}
const getEmployeeDetails = async (req, res) => {
    const { id } = req.params;
    const data = await employeesModel.Employee.findOne({ id: id })
    return res.status(200).json(data)
}
module.exports = {
    addNewEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployeeDetails
}