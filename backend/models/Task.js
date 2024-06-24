const mongoose = require('mongoose');
const TaskAssignment = require('./TaskAssignment');

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
    projectId: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Project',
        required: true
    } 
}, {
    timestamps: true
});

taskSchema.pre('remove', async function (next) {
    await TaskAssignment.deleteMany({ taskId: this._id });
    next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;