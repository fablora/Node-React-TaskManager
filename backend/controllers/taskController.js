const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { taskTitle, taskDescription, dueDate, projectId, assignedTo } = req.body;
        const taskData = {
            taskTitle,
            taskDescription,
            dueDate,
            projectId,
            assignedTo
        };

        console.log('Body:', req.body);
                
        const task = new Task(taskData);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        console.error('Error creating task:', error);
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