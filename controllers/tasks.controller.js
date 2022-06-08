const TasksModel = require('../models/tasks.model');
const EmployeesModel = require('../models/employees.model');

const addNewTask = async (req, res) => {
    const { id, name, status, assign, createdDate } = req.body;
    const idExists = await TasksModel.Task.findOne({ id: id });
    if (!idExists) {
        const newTask = new TasksModel.Task({
            id: id,
            name: name,
            status: status,
            assign: assign,
            createdDate: createdDate
        })
        newTask.save((err, data) => {
            if (err) return res.status(404).send(err);
            return res.status(200).send(data);
        });
    } else {
        return res.status(400).json({ error: "Not Valid." });
    }
}
const getAllTasks = async (req, res) => {
    const data = await TasksModel.Task.find({})
    return res.status(200).json(data)
}
const getEmployeeTasks = async (req, res) => {
    const { id } = req.params;
    const idExists = await EmployeesModel.Employee.findOne({ id: id });
    if (idExists) {
        const data = await TasksModel.Task.find({ "assign.id": idExists._id.toString() })
        return res.status(200).json(data)
    } else {
        return res.status(404).send("Employee Not Exist");
    }
}
const startEmployeeTasks = async (req, res) => {
    const { id } = req.params;
    const { idemp } = req.body;
    const idExistsTask = await TasksModel.Task.findById({ _id: id });
    const idExistsEmployees = await EmployeesModel.Employee.findOne({ id: idemp });
    if (idExistsTask && idExistsEmployees) {
            await TasksModel.Task.findOneAndUpdate({ _id: idExistsTask._id, "assign.id": (idExistsEmployees._id).toString() },{"assign.$.start":true})
            const data2 = await TasksModel.Task.findOneAndUpdate({ _id: idExistsTask._id },{status:"in progress"})
            return res.status(200).send(data2);
    } else {
        return res.status(404).send("Task or Employee Not Exist");
    }
}
const endEmployeeTasks = async (req, res) => {
    const { id } = req.params;
    const { idemp } = req.body;
    const idExistsTask = await TasksModel.Task.findById({ _id: id });
    const idExistsEmployees = await EmployeesModel.Employee.findOne({ id: idemp });
    if (idExistsTask && idExistsEmployees) {
            const data = await TasksModel.Task.findOneAndUpdate({ _id: idExistsTask._id, "assign.id": (idExistsEmployees._id).toString() },{"assign.$.end":true})
            const data2 = await TasksModel.Task.find({_id: idExistsTask._id})
            let counter = 0;
                for (let index2 = 0; index2 < data2[0].assign.length; index2++) {
                    if(data2[0].assign[index2].end===true){
                        counter++;
                    }
                }
                if(counter === data2[0].assign.length){
                    await TasksModel.Task.findOneAndUpdate({ _id: idExistsTask._id },{status:"completed"})
                }
            return res.status(200).send(data2);
    } else {
        return res.status(404).send("Task or Employee Not Exist");
    }
}
const deleteTask = async (req, res) => {
    const { id } = req.params;
    TasksModel.Task.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });    
}

// const updateEmployee = async (req, res) => {
//     const { _id } = req.params;
//     const { id, fullName, email, phoneNumber, address } = req.body;
//     const idExists = await employeesModel.Employee.findById({ _id:_id })
//     if (idExists) {
//         employeesModel.Employee.findByIdAndUpdate({ _id: _id }, {
//             id: id ? id : idExists.id, fullName: fullName ? fullName : idExists.fullName,
//             email: email ? email : idExists.email, phoneNumber: phoneNumber ? phoneNumber : idExists.phoneNumber, address: address ? address : idExists.address
//         }, { new: true, runValidators: true }, (err, data) => {
//             if (err) return res.status(404).send(err);
//             return res.status(200).send(data);
//         });
//     } else {
//         return res.status(404).send("Employee Not Exist");
//     }
// }
// const deleteEmployee = (req, res) => {
//     const { id } = req.params;
//     employeesModel.Employee.findByIdAndDelete(id, (err, data) => {
//         if (err) return res.status(404).send(err);
//         return res.status(200).send(data);
//     });
// }

module.exports = {
    addNewTask,
    getAllTasks,
    getEmployeeTasks,
    startEmployeeTasks,
    endEmployeeTasks,
    deleteTask
    // updateEmployee,
    // deleteEmployee,
}