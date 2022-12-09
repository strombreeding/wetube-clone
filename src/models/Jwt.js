"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jwtSchema = new mongoose_1.default.Schema({
    username: String,
    refresh_token: String,
    createAt: { type: Date, expires: 20, default: Date.now }
});
const JWT = mongoose_1.default.model("JWT", jwtSchema);
exports.default = JWT;
