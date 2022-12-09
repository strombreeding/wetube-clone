"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testSchema = new mongoose_1.default.Schema({
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    expires: { type: Date, required: true, default: Date.now },
});
const Test = mongoose_1.default.model("Test", testSchema);
exports.default = Test;
