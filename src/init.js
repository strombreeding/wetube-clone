"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./db");
const apiRouter_1 = __importDefault(require("./routers/apiRouter"));
const server_1 = __importDefault(require("./server"));
server_1.default.use("/", apiRouter_1.default);
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 4000;
server_1.default.listen(PORT, () => console.log(`✅ ${process.env.PORT} Server listening on port ${PORT} 🛸`));
