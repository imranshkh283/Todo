import Joi from "joi";
import { IUser, UserGenderEnum } from "./users.interface";

export const userValidation = Joi.object<IUser>({
  first_name: Joi.string().min(3).max(100).required(),
  last_name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  gender: Joi.string()
    .valid(...Object.values(UserGenderEnum))
    .required(),
  password: Joi.string().min(8).max(100).required(),
});
