const User = require('../models/User');
const ProjectAssignment = require('../models/ProjectAssignment');
const TaskAssignment = require('../models/TaskAssigment');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.assignUserToProject = async (req, res) => {
    try {
        const { userId, projectId } = req.body;
        const existingAssignment = await ProjectAssignment.findOne({ userId, projectId });
        if (existingAssignment) {
            return res.status(200).send(existingAssignment);
        }
        const assignment = new ProjectAssignment({ userId, projectId });
        await assignment.save();
        res.status(201).send(assignment);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.assignTaskToUser = async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        const assignment = new TaskAssignment({ userId, taskId });
        await assignment.save();
        res.status(201).send(assignment);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUsersByProject = async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find({ projectId: req.params.projectId }).populate('userId');
        const users = assignments.map(a => a.userId);
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};