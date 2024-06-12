const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('task');
        if (!project) {
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
};