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