"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../config/database"));
const v1_1 = __importDefault(require("./routes/v1/"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("API Running");
});
// v1 api routes
app.use("/v1", v1_1.default);
const port = config_1.default.get("port");
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
(0, database_1.default)();
exports.default = server;
