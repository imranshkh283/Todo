import { Request, Response } from "express";
import User from "./user.models";
import { IUser } from "./users.interface";
import * as userService from "./users.service";

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.userSignUp(req.body);
  res.status(201).send(user);
};
