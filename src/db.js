"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(`${process.env.DB_URL}`);
exports.db = mongoose_1.default.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
exports.db.on("error", handleError);
exports.db.once("open", handleOpen);
