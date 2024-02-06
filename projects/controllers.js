import { Db, ObjectId } from 'mongodb';
import { noDataFound } from '../bin/messages-constants.js';
import Project from './models.js';
import { postProjectSchema, updateProjectSchema } from './validation.js';


export async function getAllProject(req, res) {
    try {
        const allProjects = await Project.find({});
        res.status(200).json({ allProjects });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function getOneProject(req, res) {
    try {
        const projectId = req.params.id
        
        const project = await Project.findOne({_id: new ObjectId(projectId)});
        
        if (!project) {
            res.status(404).send(noDataFound);
            return;
        }
        
        res.status(200).json(project);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function updateProject(req, res) {
    try {
        const updates = req.body;
        const { error } = updateProjectSchema.validate(updates);
        if ( error ) {
            return res.status(400).json({ error: error.details.map((d) => d.message) })
        }
        const projectId = req.params.id;
        const projectUpdate = await Project.findOneAndUpdate({ _id: new ObjectId(projectId) }, updates );
        if (projectUpdate) {
            res.status(201).send('Project Updated');
            return;
        } else {
            res.status(404).send('Project Not Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function addNewProject(req, res) {
    try {
        const object = req.body;
        const { error } = postProjectSchema.validate(object);
        if ( error ) {
            return res.status(400).json({ error: error.details.map((d) => d.message) })
        }
        const project = new Project(object);
        const projectData = await project.save();
        res.status(201).send({ projectData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const deleteProject = await Project.findOneAndDelete({ _id: new ObjectId(projectId) });
        if (deleteProject) {
            res.status(200).send('Project Deleted');
        } else {
            res.status(404).send('Project Not Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}