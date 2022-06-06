const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    joinDate:{
        type: String,
        required: true
    },
    // items: [{
    //     type: Object,
    //     default: [{}],
    //     required: false,
    // }]
});
const Employee = mongoose.model('employees', employeesSchema);

module.exports = {
    Employee
}

