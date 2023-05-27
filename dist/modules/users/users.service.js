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
exports.getUserById = exports.getUserByEmail = exports.userSignUp = void 0;
const user_models_1 = __importDefault(require("./user.models"));
const bcrypt_1 = require("bcrypt");
// * create a new user
const userSignUp = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcrypt_1.genSalt)(10);
    userBody.password = yield (0, bcrypt_1.hash)(userBody.password, salt);
    const user = yield user_models_1.default.create(userBody);
    return user;
});
exports.userSignUp = userSignUp;
// * find a user by email
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return user_models_1.default.findOne({ email }); });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return user_models_1.default.findOne({ id }).select("password"); });
exports.getUserById = getUserById;
exports.default = { userSignUp: exports.userSignUp, getUserByEmail: exports.getUserByEmail, getUserById: exports.getUserById };
