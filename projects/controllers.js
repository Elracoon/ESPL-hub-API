import Db from '../config/db.js'
import { ObjectId } from 'mongodb';

export async function updateProject(req, res) {
    res.status(200).send("update project")
}

export async function getAllProject(req, res) {
    const db = await Db.connect();
    const result = await db.collection('projects').find({}).toArray();
    res.status(200).send(result)
}

export async function getOneProject(req, res) {
    const projectId = req.params.id
    const db = await Db.connect();
    const result = await db.collection('projects').findOne({_id: new ObjectId(projectId)});
    console.log(result)
    res.status(200).send(result)
}