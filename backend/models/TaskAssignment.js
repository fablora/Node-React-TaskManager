const mongoose = require('mongoose');

const taskAssignmentSchema = new mongoose.Schema({
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

const TaskAssignment = mongoose.model('TaskAssignment', taskAssignmentSchema);
module.exports = TaskAssignment;