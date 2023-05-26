import express, { Router } from "express";
import { userController, userValidation } from "../../modules/users";

const router: Router = express.Router();

router.route("/");
router.post("/signup", userController.createUser);

export default router;
