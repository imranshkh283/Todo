import express, { Router } from "express";
import { postController } from "../../modules/posts";
import { auth } from "../../modules/auth";
const router: Router = express.Router();

router.route("/");
router.post("/", auth, postController.createPost);

export default router;
