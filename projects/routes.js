import { Router } from "express"
import { getAllProject, getOneProject, updateProject } from "./controllers.js"

const router = Router()

router.get("/", getAllProject)
router.get("/:id", getOneProject)
// router.post('/add', createProject)
router.patch('/update', updateProject)

export default router