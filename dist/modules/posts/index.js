"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = exports.postService = exports.PostModel = exports.postInterfaces = exports.postController = void 0;
const postController = __importStar(require("./posts.controller"));
exports.postController = postController;
const postInterfaces = __importStar(require("./posts.interface"));
exports.postInterfaces = postInterfaces;
const posts_models_1 = require("./posts.models");
Object.defineProperty(exports, "PostModel", { enumerable: true, get: function () { return posts_models_1.PostModel; } });
const postService = __importStar(require("./posts.service"));
exports.postService = postService;
const postValidation = __importStar(require("./posts.validation"));
exports.postValidation = postValidation;
