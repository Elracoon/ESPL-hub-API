import { Router } from "express"
import { addUser, login } from "./controllers.js"

const router = Router()

router.post('/add', addUser)
router.get("/login", login)

export default router