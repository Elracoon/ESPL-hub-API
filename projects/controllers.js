import Db from '../config/db.js'

export async function updateProject(req, res) {
    res.status(200).send("update project")
}

export async function getAllProject(req, res) {
    const db = Db.connect();
    const result = db.collection("project").find();
    res.status(200).send("result")
}