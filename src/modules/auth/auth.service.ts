import { getUserByEmail, getUserById } from "../users/users.service";
import ApiError from "../utils/errors/ApiError";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await getUserByEmail(email);
  // @ts-expect-error
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!user || !isPasswordMatch) {
    throw new ApiError(500, "Incorrect email or password");
  } else {
    const SECRET_KEY: Secret = "your-secret-key-here";
    const token = jwt.sign(
      { id: user._id?.toString(), email: user.email },
      SECRET_KEY,
      {
        expiresIn: "2 days",
      }
    );
    return { user: { id: user._id, email }, token: token };
  }
};
