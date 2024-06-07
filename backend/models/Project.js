const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    
    projectName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    projectTimeline: { 
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    projectTasks: [{ 
        type: mongoose.Schema.ObjectId, 
        ref: 'Task'
    }]
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;