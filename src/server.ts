import config from "config";
import express from "express";
import connectDB from "./modules/config/database";
import routes from "./routes/v1/";
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API Running");
});

// v1 api routes
app.use("/v1", routes);

const port = config.get<number>("port");

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
connectDB();
export default server;
