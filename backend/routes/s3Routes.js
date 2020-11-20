import express from "express"
import { upload, del } from "../controller/s3Controller.js"
import { deleteObject, uploadObject } from "../middleware/s3Middleware.js"

const router = express.Router()

router
    .route("/")
    .post(uploadObject, upload)
    .delete(deleteObject, del)

export default router;