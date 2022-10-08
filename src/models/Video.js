"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
    title: { type: String, trim: true, required: true, maxLength: 35 },
    fileUrl: { type: String, required: true },
    description: { type: String, trim: true, required: true, minLength: 10 },
    createdAt: { type: Date, default: Date.now },
    hashtags: [{ type: String, trim: true, }],
    views: { type: Number, default: 1 },
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "Comment" }]
});
const Video = mongoose_1.default.model("Video", videoSchema);
exports.default = Video;
