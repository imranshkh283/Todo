import { User } from "./user.models";
import { IUser, NewCreatedUser } from "./users.interface";
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

export const getUser = async (email: string): Promise<IUser | null> =>
  User.findOne({ email }).select("-password -gender");

export default { userSignUp, getUserByEmail, getUser };
