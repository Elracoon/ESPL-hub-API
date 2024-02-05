import { Db, ObjectId } from 'mongodb';
import { noDataFound } from '../bin/messages-constants.js';
import Project from './models.js';
import { postProjectSchema, updateProjectSchema } from './validation.js';

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
            res.status(200).send('Le projet mis à jour');
            return;
        } else {
            res.status(404).send('Le projet n\'a pas été protégé');
        }
    } catch (error) {
        console.error('Erreur lors de la modification du projet :', error);
        res.status(500).send('Erreur lors de la modification du projet');
    }
}

export async function getAllProject(req, res) {
    try {
        const allProjects = await Project.find({});
        console.log('Tous les projets :', allProjects);
        res.status(200).json({ allProjects });
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        res.status(500).send('Erreur lors de la récupération des projets');
    }
}

export async function getOneProject(req, res) {
    try {
        const projectId = req.params.id
        console.log('ID du projet :', projectId);

        const project = await Project.findOne({_id: new ObjectId(projectId)});
        console.log('Projet trouvé :', project);

        if (!project) {
            console.log('Aucun projet trouvé');
            res.status(404).send(noDataFound);
            return;
        }
        
        res.status(200).json(project);
    } catch (error) {
        console.error('Erreur lors de la récupération du projet :', error);
        res.status(500).send('Erreur lors de la récupération du projet');
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
        res.status(200).send({ projectData });
    } catch (error) {
        console.error('Erreur lors de la création du projet :', error);
        res.status(500).send('Erreur lors de la création du projet');
    }
}

export async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const deleteProject = await Project.findOneAndDelete({ _id: new ObjectId(projectId) });
        if (deleteProject) {
            res.status(200).send('Le projet a été supprimé');
        } else {
            res.status(404).send('Le projet n\'a pas été trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du projet :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du projet :' });
    }
}