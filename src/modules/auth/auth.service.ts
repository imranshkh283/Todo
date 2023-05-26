import { getUserByEmail, getUserById } from "../users/users.service";
import ApiError from "../utils/errors/ApiError";
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await getUserByEmail(email);
  if (!user /* || !(await user.isPasswordMatch(password)) */) {
    throw new ApiError(404, "Incorrect email or password");
  }
  return user;
};
