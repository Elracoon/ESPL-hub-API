import { Router } from "express"
import { addUser, login, updateUser, getUserData, deleteUser } from "./controllers.js"
import { authentification } from "../tools/helpers/authentification.js"

const router = Router();

/** Documentation de la route /users/
 * @swagger
 * /users/:
 *  get:
 *   description: Get user data
 *   tags:
 *     - Routes Users
 *   responses:
 *     200:
 *       description: User data
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
 *               status:
 *                 type: string
 *                 enum: ["company", "association", "student"]
 *               competences:
 *                 type: string
 *                 example: ["developpement", "design", "marketing", "communication", "ux/ui"]
 *     404:
 *       description: No data found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No data found
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
router.get("/", authentification, getUserData)

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
 *               competences:
 *                 type: string
 *                 example: ["developpement", "design", "marketing", "communication", "ux/ui"]
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
 *     400:
 *       description: User informations are missing
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: username is required
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
 *     400:
 *       description: User informations are missing
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: username is required
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

/** Documentation de la route /users/
 * @swagger
 * /users/:
 *  patch:
 *   description: Update user to database
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
 *                 example: ["company", "association", "student"]
 *               competences:
 *                 type: string
 *                 example: ["developpement", "design", "marketing", "communication", "ux/ui"]
 *   tags:
 *     - Routes Users
 *   responses:
 *     200:
 *       description: Update Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Update Success
 *     400:
 *       description: User informations are missing
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: username is required
 *     404:
 *       description: Ressource not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Ressource not found
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
router.patch("/", authentification, updateUser)

/** Documentation de la route /users/
 * @swagger
 * /users/:
 *  delete:
 *   description: Delete user
 *   tags:
 *     - Routes Users
 *   responses:
 *     200:
 *       description: User data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User delete with success
 *               
 *     404:
 *       description: No data found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No data found
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
router.delete("/", authentification, deleteUser)

export default router