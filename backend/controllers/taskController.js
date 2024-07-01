const Task = require('../models/Task');
const TaskAssignment = require('../models/TaskAssignment');

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
        const { projectId, userId } = req.params;
        const tasks = await Task.find({ projectId, assignedTo: userId });
        res.send(tasks);
    } catch (error){
        res.status(500).send(error);
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('assignedTo');
        if (!task) {
            return res.status(404).json();
        }
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { assignedTo, ...taskData } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true});
        if (!updatedTask) {
            return res.status(404).json();
        }

        if (assignedTo) {
            await TaskAssignment.findOneAndUpdate(
                { taskId },
                { userId: assignedTo },
                { upsert: true, new: true }
            );
            updatedTask.assignedTo = assignedTo;
            await updatedTask.save();
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        await Task.findByIdAndDelete(taskId);
        await TaskAssignment.deleteMany({ taskId });
        res.status(200).send({ message: 'Task removed from project and task assignment deleted' });
    } catch (error) {
        console.error('Error deleting tasks:', error);
        res.status(500).send(error);
    }
};