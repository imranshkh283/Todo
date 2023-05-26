import User from "./posts.models";
import { IUser, NewCreatedUser } from "./posts.interface";
import { genSalt, hash } from "bcrypt";

// * create a new user
export const userSignUp = async (userBody: NewCreatedUser): Promise<IUser> => {
  const salt = await genSalt(10);
  userBody.password = await hash(userBody.password, salt);

  const user = await User.create(userBody);
  return user;
};

// * find a user by email
export const getUserByEmail = async (email: string): Promise<IUser | null> =>
  User.findOne({ email });

export const getUserById = async (id: string): Promise<IUser | null> =>
  User.findOne({ id }).select("password");

export default { userSignUp, getUserByEmail, getUserById };
