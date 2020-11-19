import express from "express";
import { getPosts, makePost } from "../controller/postController.js";
const router = express.Router();

router.route("/")
.post(makePost)     //Make a post in the db
.get(getPosts);     //Get post

export default router;
 