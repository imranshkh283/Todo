"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const token_type_1 = __importDefault(require("./token.type"));
const tokenSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: String,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: [
            token_type_1.default.REFRESH,
            token_type_1.default.RESET_PASSWORD,
            token_type_1.default.VERIFY_EMAIL,
        ],
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Token = mongoose_1.default.model("Token", tokenSchema);
exports.default = Token;
