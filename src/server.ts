import express from "express";
import connectDB from "../config/database";
const app = express();

connectDB();
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("API Running");
});

const server = app.listen(3000, () =>
  console.log(`Server started on port 3000`)
);

export default server;
