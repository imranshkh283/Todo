import express, { Router } from "express";
import { authController } from "../../modules/auth";

const routes: Router = express.Router();

routes.post("/login", authController.login);

export default routes;
