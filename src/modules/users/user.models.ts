import { model, Schema } from "mongoose";
import { IUser } from "./users.interface";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },

  created_at: { type: Date, default: () => new Date() },
  updated_at: { type: Date, default: () => new Date() },
});

userSchema.method('isPasswordMatch', async function (password: string) {
  const user = this;
  return await bcrypt.compare(password, this.password);
});

const User = model<IUser>("user", userSchema);

export default User;