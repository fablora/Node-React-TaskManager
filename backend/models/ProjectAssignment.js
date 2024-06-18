const mongoose = require('mongoose');

const projectAssigmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssigmentSchema);
module.exports = ProjectAssignment;