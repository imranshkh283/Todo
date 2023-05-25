import { User } from "./user.models";
import { IUser } from "./users.interface";
import { genSalt, hash } from "bcrypt";
//  * Find a user by email
export const findOne = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

// * create a new user
export const createUser = async (
  data: Pick<
    IUser,
    "first_name" | "last_name" | "email" | "password" | "gender"
  >
) => {
  const salt = await genSalt(10);
  data.password = await hash(data.password, salt);

  const user = await User.create(data);
  return user;
};

export default { findOne, createUser };
