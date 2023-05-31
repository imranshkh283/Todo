import express, { Router } from "express";
import { postController } from "../../modules/posts";
import { auth } from "../../modules/auth";
const router: Router = express.Router();

router.get("/", auth, postController.getAllPosts);
router.post("/", auth, postController.createPost);
router.get("/:id", auth, postController.getPostById);
router.put("/:id", auth, postController.updatePostByUser);
router.delete("/:id", auth, postController.deletePostByUser);

export default router;
