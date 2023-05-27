"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../../modules/posts");
const auth_1 = require("../../modules/auth");
const router = express_1.default.Router();
router.route("/");
router.post("/", auth_1.auth, posts_1.postController.createPost);
exports.default = router;
