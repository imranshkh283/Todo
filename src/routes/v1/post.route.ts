import express, { Router } from "express";
import { postController } from "../../modules/posts";

const router: Router = express.Router();

router.route("/");
router.post("/", postController.createUser);

export default router;
