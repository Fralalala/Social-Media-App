import express from "express";
import { getPosts, makePost, delPost } from "../controller/postController.js";
import { deleteObject } from "../middleware/s3Middleware.js";
const router = express.Router();

router.route("/")
.post(makePost)     //Make a post in the db
.get(getPosts)     //Get post
.delete(deleteObject, delPost ) //delete img in s3 then del post in atlas

export default router;
 