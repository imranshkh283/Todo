import { User } from "./user.models";
import { IUser, NewCreatedUser } from "./users.interface";
import { genSalt, hash } from "bcrypt";

//  * Find a user by email
export const findOne = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

// * create a new user
export const userSignUp = async (userBody: NewCreatedUser): Promise<IUser> => {
  const salt = await genSalt(10);
  userBody.password = await hash(userBody.password, salt);

  const user = await User.create(userBody);
  return user;
};

// * find a user by email
export const findByEmail = async (email: string): Promise<IUser | null> =>
  User.findOne({ email });

export default { findOne, userSignUp, findByEmail };
