const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    taskTitle: {
        type: String,
        required: true,
        trim: true
    },
    taskDescription: {
        type: String,
        required: true,
        trim: true
    },
    taskStatus: { 
        type: String, 
        enum: ['To Do', 'In Progress', 'Completed' ], 
        default: 'To Do'
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    dueDate: {
        type: Date,
        required: true
    },
    proejctId: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Project',
        required: true
    } 
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;