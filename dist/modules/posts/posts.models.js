"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    created_at: { type: Date, default: () => new Date() },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    updated_at: { type: Date, default: () => new Date() },
    updated_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
});
exports.PostModel = (0, mongoose_1.model)("post", postSchema);
