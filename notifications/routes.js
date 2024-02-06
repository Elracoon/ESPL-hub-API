import { Router } from "express";
import { getAllNotification, getOneNotification, addNewNotification, deleteNotification, changesReadStatusNotification, getNoReadNotification } from "./controllers.js";

const router = Router();

/** Documentation de la route notifications/
 * @swagger
 * /notifications:
 *  get:
 *   description: Get all notifications from database
 *   tags:
 *     - Routes Notifications
 *   responses:
 *     200:
 *       description: Get All Notifications
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Get All Notifications
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
router.get("/", getAllNotification);

/** Documentation de la route notifications/:id
 * @swagger
 * /notifications/:id:
 *  get:
 *   description: Get one notification from database
 *   tags:
 *     - Routes Notifications
 *   parameters:
 *     - in: path
 *       name: Notification Id
 *       required: true
 *       description: Notification Id
 *       schema:
 *          type: string
 *   responses:
 *     200:
 *       description: Get Notification by id
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Notification data
 *     404:
 *       description: Notification Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Notification Not Found
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
router.get("/getone/:id", getOneNotification);

/** Documentation de la route notifications/add
 * @swagger
 * /notifications/add:
 *  post:
 *   description: Add Notification to database
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               createdAt:
 *                 type: date
 *   tags:
 *     - Routes Notifications
 *   responses:
 *     201:
 *       description: Notification Added
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Notification Added
 *     400:
 *       description: Notification Propety Is Missing
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: message is required
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
router.post("/add", addNewNotification);

/** Documentation de la route notifications/:id
 * @swagger
 * /notifications/:id:
 *  delete:
 *   description: Delete Notification from database
 *   tags:
 *     - Routes Notifications
 *   parameters:
 *     - in: path
 *       name: Notification Id
 *       required: true
 *       description: Notification Id
 *       schema:
 *          type: string
 *   responses:
 *     200:
 *       description: Notification Deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Notification Deleted
 *     404:
 *       description: Notification Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Notification Not Found
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
router.delete("/:id", deleteNotification);

/** Documentation de la route notifications/:id
 * @swagger
 * /notifications/:id:
 *  patch:
 *   description: Update notification read status
 *   tags:
 *     - Routes Notifications
 *   parameters:
 *     - in: path
 *       name: Notification Id
 *       required: true
 *       description: Notification Id
 *       schema:
 *          type: string
 *   responses:
 *     200:
 *       description: Notification Read Status Updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Notification Read Status Updated
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
router.patch("/:id", changesReadStatusNotification);

router.get("/noread", getNoReadNotification);

export default router;