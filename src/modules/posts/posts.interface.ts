import { Types } from "mongoose";
import { IUser } from "../users/users.interface";

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  text: string;
  image: string;

  created_by: IUser["_id"];
  created_at: Date;

  updated_by: IUser["_id"];
  updated_at: Date;
}

export type NewCreatedPost = Pick<IPost, "text" | "title" | "created_by">;
