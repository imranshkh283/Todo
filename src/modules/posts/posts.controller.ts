import { Request, Response } from "express";
import * as postService from "./posts.service";

export const createPost = async (req: Request, res: Response) => {
  const token = (req as any).token;
  req.body.created_by = token.id;
  req.body.updated_by = token.id;

  const post = await postService.createPost(req.body);
  res.status(201).json({
    message: "Post create successfully",
    post: post,
  });
};

export const getAllPosts = async (req: Request, res: Response) => {
  const token = (req as any).token;
  if (!token) {
    res.status(401).send("Unauthorized");
  } else {
    const posts = await postService.getAllPosts(token.id);
    res.status(201).send(posts);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const token = (req as any).token;
  req.body.created_by = token.id;
  req.body._id = req.params.id;
  const post = await postService.getSinglePost(req.body);
  if (post?.length === 0) {
    res.status(404).json("Post not found");
  } else {
    res.status(201).send(post);
  }
};

export const updatePostByUser = async (req: Request, res: Response) => {
  const token = (req as any).token;
  req.body.created_by = token.id;
  req.body._id = req.params.id;
  const postExist = await postService.getSinglePost(req.body);
  if (postExist?.length === 0) {
    res.status(404).json("Post not found");
  } else {
    const post = await postService.updatePost(req.body);
    res.status(201).json({
      message: "Post updated successfully",
      post: post,
    });
  }
};

export const deletePostByUser = async (req: Request, res: Response) => {
  const token = (req as any).token;
  req.body.created_by = token.id;
  req.body._id = req.params.id;
  const postExist = await postService.getSinglePost(req.body);
  if (postExist?.length === 0) {
    res.status(404).json("Post not found");
  } else {
    const post = await postService.deletePost(req.body);
    res.status(201).json({
      message: "Post deleted successfully",
    });
  }
};
