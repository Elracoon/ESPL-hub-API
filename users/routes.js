import { Router } from "express"
import { addUser, login, updateUser } from "./controllers.js"
import { authentification } from "../tools/helpers/authentification.js"

const router = Router();

/** Documentation de la route /users/add
 * @swagger
 * /users/add:
 *  post:
 *   description: Add user to database
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - "company"
 *                   - "association"
 *                   - "student"
 *               compatences:
 *                 type: string
 *                 enum:
 *                   - "developpement"
 *                   - "design"
 *                   - "marketing"
 *                   - "communication"
 *                   - "ux/ui"
 *   tags:
 *     - Routes Users
 *   responses:
 *     201:
 *       description: User added
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: user id
 *     409:
 *       description: User with the same email already exists
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User with the same email already exists
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Internal Server Error
 */
router.post('/add', addUser)

/** Documentation de la route /users/login
 * @swagger
 * /users/login:
 *  post:
 *   description: Verify if user exists in database
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *   tags:
 *     - Routes Users
 *   responses:
 *     200:
 *       description: Token with user id
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     401:
 *       description: Access Denied
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Access denied
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Internal Server Error
 */
router.post("/login", login)

router.patch("/", authentification, updateUser)

export default router