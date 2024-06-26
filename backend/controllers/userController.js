const User = require('../models/User');
const ProjectAssignment = require('../models/ProjectAssignment');
const TaskAssignment = require('../models/TaskAssignment');
const Task = require('../models/Task');

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

exports.removeUserFromProject = async (req, res) => {
    try {
        const { userId, projectId } = req.body;
        const tasks = await Task.find({ projectId, assignedTo:userId });
        const taskAssignmentRemovals = tasks.map(async (task) => {
            await TaskAssignment.deleteMany({ taskId: task._id, userId });
            task.assignedTo = null;
            await task.save();
        });
        const projectAssignmentRemoval = ProjectAssignment.findOneAndDelete({ userId, projectId });
        await Promise.all([projectAssignmentRemoval, ...taskAssignmentRemovals]);
        res.status(200).send({ message: 'User removed from project and task assignments deleted' });
    } catch (error) {
        console.error('Error removing user:', error);
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

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        await user.remove();
        res.send({ message: 'User and related assignments deleted' });
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).send(error);
    }
};