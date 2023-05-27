import { PostModel } from "./posts.models";
import { IPost, NewCreatedPost } from "./posts.interface";

// * create a new post

export const createPost = async (
  postBody: NewCreatedPost
): Promise<NewCreatedPost> => {
  const post = await PostModel.create({
    ...postBody,
    /* created_by: _id,
    updated_by: _id, */
  });
  return post;
};

export default { createPost };
