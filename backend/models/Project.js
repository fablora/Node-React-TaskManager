const mongoose = require('mongoose');
const Task = require('./Task');
const ProjectAssignment = require('./ProjectAssignment');

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

projectSchema.pre('remove', async function(next) {
    await Task.deleteMany({ projectId: this._id });
    await ProjectAssignment.deleteMany({ projectId: this._id });
    next();
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;