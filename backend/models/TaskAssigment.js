const mongoose = require('mongoose');

const taskAssigmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    assignedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const TaskAssigment = mongoose.model('TaskAssigment', taskAssigmentSchema);
module.exports = TaskAssigment;