import { Request, Response } from "express";
import { PostModel } from "./posts.models";
import { IPost } from "./posts.interface";
import * as userService from "./posts.service";

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.userSignUp(req.body);
  res.status(201).send(user);
};
