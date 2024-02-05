import { Router } from "express"
import { getAllProject, getOneProject, updateProject, addNewProject, deleteProject } from "./controllers.js"

const router = Router()

router.get("/", getAllProject)
router.get("/:id", getOneProject)
router.patch('/:id', updateProject)
router.post('/add', addNewProject)
router.delete('/:id', deleteProject)

export default router