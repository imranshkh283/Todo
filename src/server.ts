import express from "express";
import connectDB from "../config/database";
import routes from "./routes/v1/";
const app = express();

connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API Running");
});

// v1 api routes
app.use("/v1", routes);

const server = app.listen(3000, () =>
  console.log(`Server started on port 3000`)
);

export default server;
