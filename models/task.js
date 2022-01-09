const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'must provide name'],
        trim:true,
        maxlength:[30, 'task name cannot be longer than 30 characters']
    },
    completed:{
        type: Boolean,
        default: false
    },
})

const TasksModel = mongoose.model('Task', TaskSchema);

module.exports = TasksModel;