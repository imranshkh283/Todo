import { Types } from "mongoose";
import {
  IPost,
  NewCreatedPost,
  singlePost,
  singlePostId,
  TUpdatePost,
} from "./posts.interface";
import { PostModel } from "./posts.models";

// * create a new post

export const createPost = async (
  postBody: NewCreatedPost
): Promise<NewCreatedPost> => {
  const post = await PostModel.create({
    ...postBody,
  });
  return post;
};

// * get all posts

export const getAllPosts = async (
  id: Types.ObjectId
): Promise<singlePost[] | null> =>
  PostModel.find({
    created_by: id,
  }).select("_id title text created_by");

export const getSinglePost = async (
  postBody: singlePostId
): Promise<IPost[] | null> => {
  const post = await PostModel.find({
    created_by: postBody.created_by,
    _id: postBody._id,
  }).select("_id title text created_by");
  return post;
};

export const updatePost = async (
  postBody: TUpdatePost
): Promise<IPost | null> => {
  const post = await PostModel.findOneAndUpdate(
    {
      created_by: postBody.created_by,
      _id: postBody._id,
    },
    {
      title: postBody.title,
      text: postBody.text,
    },
    {
      new: true,
    }
  );
  return post;
};

export const deletePost = async (
  postBody: singlePostId
): Promise<IPost | null> => {
  const post = await PostModel.findOneAndDelete({
    created_by: postBody.created_by,
    _id: postBody._id,
  });
  return post;
};

export default {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
