"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserWithEmailAndPassword = void 0;
const users_service_1 = require("../users/users.service");
const ApiError_1 = __importDefault(require("../utils/errors/ApiError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUserWithEmailAndPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield (0, users_service_1.getUserByEmail)(email);
    // @ts-expect-error
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!user || !isPasswordMatch) {
        throw new ApiError_1.default(500, "Incorrect email or password");
    }
    else {
        const SECRET_KEY = "your-secret-key-here";
        const token = jsonwebtoken_1.default.sign({ id: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString(), email: user.email }, SECRET_KEY, {
            expiresIn: "2 days",
        });
        return { user: { id: user._id, email }, token: token };
    }
});
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
