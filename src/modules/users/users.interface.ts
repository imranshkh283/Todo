import { Types } from "mongoose";

export enum UserGenderEnum {
  male = "male",
  female = "female",
  others = "others",
}

export interface IUser {
  // _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  gender: UserGenderEnum;
  password: string;

  created_at?: Date;
  updated_at?: Date;
}

export type NewCreatedUser = Omit<IUser, "created_at" | "updated_at">;
