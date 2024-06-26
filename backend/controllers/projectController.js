const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');

exports.createProject = async (req, res) => {
    try {
        const { projectName, projectTimeline } = req.body;
        const projectData = {
            projectName,
            projectTimeline
        };


        const project = new Project(projectData);
        await project.save();

        const createdProject = project.toObject();
        delete createdProject.projectTasks;
        delete createdProject.__v;

        res.status(201).send(createdProject);
    } catch (error) {
        console.error('Creating new project:', error);
        res.status(400).send(error);
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.send(projects);
    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).send(error);
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('task');
        if (!project) {
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send();
        }
        await project.remove();
        res.send({ message: 'Project and related tasks and assignments deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send(error);
    }
};