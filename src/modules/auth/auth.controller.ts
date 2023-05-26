import { Request, Response } from "express";
import { tokenService } from "../token";
import * as authService from "./auth.service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
};
