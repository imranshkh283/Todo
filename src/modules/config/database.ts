import config from "config";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = config.get("mongoURI");
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    process.exit(1);
  }
};

export default connectDB;
