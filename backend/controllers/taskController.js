const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTasksByProject = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTasksByUserAndProject = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId, assignedTo: req.params.userId });
        res.send(tasks);
    } catch (error){
        res.status(500).send(error);
    }
};