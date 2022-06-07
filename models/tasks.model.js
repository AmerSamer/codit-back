const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "waiting",
        required: false
    },
    createdDate:{
        type: String,
        default: "",
        required: false
    },
    assign: [{
        type: Object,
        default: [{}],
        required: false,
    }]
});
const Task = mongoose.model('tasks', tasksSchema);

module.exports = {
    Task
}

