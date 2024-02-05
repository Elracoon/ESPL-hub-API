import { Router } from "express"
import { addUser, login, getUsers } from "./controllers.js"
import { authentification } from "../tools/helpers/authentification.js"

const router = Router()

router.get('/', getUsers)
router.post('/add', addUser)
router.get("/login", login)

export default router