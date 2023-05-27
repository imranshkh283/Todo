import { model, Schema } from "mongoose";
import { IPost } from "./posts.interface";

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  created_at: { type: Date, default: () => new Date() },
  created_by: { type: Schema.Types.ObjectId, ref: "user" },
  updated_at: { type: Date, default: () => new Date() },
  updated_by: { type: Schema.Types.ObjectId, ref: "user" },
});

export const PostModel = model<IPost>("post", postSchema);
