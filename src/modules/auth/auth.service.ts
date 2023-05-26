import { getUserByEmail,getUserById } from "../users/users.service";
import { IUser } from "../users/users.interface";

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await getUserByEmail(email);
  return user;
};
