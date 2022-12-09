"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true, minLength: 2 },
    createdAt: { type: Date, default: Date.now },
    video: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "Video" },
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "User" },
});
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
