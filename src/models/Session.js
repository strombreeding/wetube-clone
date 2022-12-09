"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    id: String,
    expires: Date,
    session: String,
});
const SessionData = mongoose_1.default.model("Session", sessionSchema);
exports.default = SessionData;
