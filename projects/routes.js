import { Router } from "express"
import { getAllProject, getOneProject, updateProject, addNewProject, deleteProject } from "./controllers.js"

const router = Router()

/** Documentation de la route projects/
 * @swagger
 * /projects:
 *  post:
 *   description: Get all projects from database
 *   tags:
 *     - Routes Projects
 *   responses:
 *     200:
 *       description: Get All Projects
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Get All Projects
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
router.get("/", getAllProject)

/** Documentation de la route projects/:id
 * @swagger
 * /projects/:id:
 *  get:
 *   description: Get one project from database
 *   tags:
 *     - Routes Projects
 *   parameters:
 *     - in: path
 *       name: Project Id
 *       required: true
 *       description: Project Id
 *       schema:
 *          type: string
 *   responses:
 *     200:
 *       description: Get project by id
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Project data
 *     404:
 *       description: No Data Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Data Found
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
router.get("/:id", getOneProject)

/** Documentation de la route projects/:id
 * @swagger
 * /projects/:id:
 *  patch:
 *   description: Update projects in database
 *   requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               projectManager:
 *                 type: string
 *               createdAt:
 *                 type: date
 *               competences:
 *                 type: string
 *                 example: ['developpement', 'design', 'marketing', 'communciation', 'ux/ui']
 *   tags:
 *     - Routes Projects
 *   parameters:
 *     - in: path
 *       name: Project Id
 *       required: true
 *       description: Project Id
 *       schema:
 *          type: string
 *   responses:
 *     201:
 *       description: Project Updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Project Updated
 *     400:
 *       description: Project Propety Is Not Allowed
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: titlee is not allowed
 *     404:
 *       description: Project Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Project Not Found
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
router.patch('/:id', updateProject)

/** Documentation de la route projects/add
 * @swagger
 * /projects/add:
 *  post:
 *   description: Add projects to database
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               projectManager:
 *                 type: string
 *               createdAt:
 *                 type: date
 *               competences:
 *                 type: string
 *                 example: ['developpement', 'design', 'marketing', 'communciation', 'ux/ui']
 *   tags:
 *     - Routes Projects
 *   responses:
 *     201:
 *       description: Project Added
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Project Added
 *     400:
 *       description: Project Propety Is Missing
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: title is required
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
router.post('/add', addNewProject)

/** Documentation de la route projects/:id
 * @swagger
 * /projects/:id:
 *  delete:
 *   description: Delete projects from database
 *   tags:
 *     - Routes Projects
 *   parameters:
 *     - in: path
 *       name: Project Id
 *       required: true
 *       description: Project Id
 *       schema:
 *          type: string
 *   responses:
 *     200:
 *       description: Project Deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Project Deleted
 *     404:
 *       description: Project Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Project Not Found
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
router.delete('/:id', deleteProject)

export default router