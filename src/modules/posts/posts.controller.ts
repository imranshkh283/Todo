import config from "config";
import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import * as postService from "./posts.service";

export const SECRET_KEY: Secret = config.get<string>("SECRET_KEY");

export const createPost = async (req: Request, res: Response) => {
  const token = (req as any).token;
  req.body.created_by = token.id;
  req.body.updated_by = token.id;

  const post = await postService.createPost(req.body);
  res.status(201).send(post);
};
