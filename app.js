import { Router } from "express"

const router = Router()

router.use("/", async(req, res) => {
    res.status(200).json('hello world')
})

export default router