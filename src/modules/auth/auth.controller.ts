import { Request, Response } from "express";
import { userService } from "../users";
import * as authService from "./auth.service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  res.send({ user });
};
