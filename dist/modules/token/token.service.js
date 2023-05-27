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
exports.generateVerifyEmailToken = exports.generateResetPasswordToken = exports.generateAuthTokens = exports.verifyToken = exports.saveToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const token_model_1 = __importDefault(require("./token.model"));
const ApiError_1 = __importDefault(require("../utils/errors/ApiError"));
const token_type_1 = __importDefault(require("./token.type"));
const users_1 = require("../users");
/**
 * Generate token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = "my-secret-token") => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
        type,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.generateToken = generateToken;
/**
 * Save a token
 * @param {string} token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<ITokenDoc>}
 */
const saveToken = (token, userId, expires, type, blacklisted = false) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDoc = yield token_model_1.default.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
});
exports.saveToken = saveToken;
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<ITokenDoc>}
 */
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.verify(token, "my-secret-token");
    if (typeof payload.sub !== "string") {
        throw new ApiError_1.default(500, "bad user");
    }
    const tokenDoc = yield token_model_1.default.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw new Error("Token not found");
    }
    return tokenDoc;
});
exports.verifyToken = verifyToken;
/**
 * Generate auth tokens
 
 */
const generateAuthTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = (0, moment_1.default)().add(120, "minutes");
    const accessToken = (0, exports.generateToken)(user._id, accessTokenExpires, token_type_1.default.ACCESS);
    const refreshTokenExpires = (0, moment_1.default)().add(120, "days");
    const refreshToken = (0, exports.generateToken)(user._id, refreshTokenExpires, token_type_1.default.REFRESH);
    yield (0, exports.saveToken)(refreshToken, user._id, refreshTokenExpires, token_type_1.default.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
});
exports.generateAuthTokens = generateAuthTokens;
/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.userService.getUserByEmail(email);
    if (!user) {
        throw new ApiError_1.default(204, "");
    }
    const expires = (0, moment_1.default)().add(120, "minutes");
    const resetPasswordToken = (0, exports.generateToken)(user._id, expires, token_type_1.default.RESET_PASSWORD);
    yield (0, exports.saveToken)(resetPasswordToken, user._id, expires, token_type_1.default.RESET_PASSWORD);
    return resetPasswordToken;
});
exports.generateResetPasswordToken = generateResetPasswordToken;
/**
 * Generate verify email token
 */
const generateVerifyEmailToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const expires = (0, moment_1.default)().add(120, "minutes");
    const verifyEmailToken = (0, exports.generateToken)(user._id, expires, token_type_1.default.VERIFY_EMAIL);
    yield (0, exports.saveToken)(verifyEmailToken, user._id, expires, token_type_1.default.VERIFY_EMAIL);
    return verifyEmailToken;
});
exports.generateVerifyEmailToken = generateVerifyEmailToken;
