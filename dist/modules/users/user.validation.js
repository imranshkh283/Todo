"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const users_interface_1 = require("./users.interface");
exports.userValidation = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(100).required(),
    last_name: joi_1.default.string().min(3).max(100).required(),
    email: joi_1.default.string().email().required(),
    gender: joi_1.default.string()
        .valid(...Object.values(users_interface_1.UserGenderEnum))
        .required(),
    password: joi_1.default.string().min(8).max(100).required(),
});
