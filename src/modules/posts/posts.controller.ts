import config from "config";
import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import * as postService from "./posts.service";

export const SECRET_KEY: Secret = config.get<string>("SECRET_KEY");

export const createPost = async (req: Request, res: Response) => {
  const token = req.headers.authorization!.split("Bearer ")[1];
  
  const decode = jwt.verify(token, SECRET_KEY);
  let created_by: string = (decode as JwtPayload).id;
  const post = await postService.createPost(req.body, created_by);
  res.status(201).send(post);
};
