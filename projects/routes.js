import { Router } from "express"
import { getAllProject, updateProject } from "./controllers.js"

const router = Router()

router.get("/", getAllProject)
// router.post('/add', createProject)
router.patch('/update', updateProject)

export default router