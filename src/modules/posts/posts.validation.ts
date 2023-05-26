import Joi from "joi";
import { IPost } from "./posts.interface";

export const userValidation = Joi.object<IPost>({
  title: Joi.string().min(3).max(100).required(),
  text: Joi.string().min(10).required(),
});
