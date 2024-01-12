const { Db } = await import("../config/db.js");
import { ObjectId } from 'mongodb';
import { noDataFound } from '../bin/messages-constants.js';
import { Project } from './models.js';

export async function updateProject(req, res) {
    res.status(200).send("update project")
}

export async function getAllProject(req, res) {
    try {
        const db = await Db.connect();
        const projectsCollection = db.collection('projects');
        const projects = await projectsCollection.find({}).toArray();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        res.status(500).send('Erreur lors de la récupération des projets');
    }
}

export async function getOneProject(req, res) {
    try {
        const db = await Db.connect();
        const projectsCollection = db.collection('projetcs');
        const projectId = req.params.id

        const projects = await projectsCollection.findOne({_id: new ObjectId(projectId)});

        if (projects.length === 0) {
            res.status(404).send(noDataFound);
            return;
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error('Erreur lors de la récupération du projet :', error);
        res.status(500).send('Erreur lors de la récupération du projet');
    }
}