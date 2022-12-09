"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rootController_1 = require("../controllers/rootController");
const middlewares_1 = require("../middlewares");
const rootRouter = express_1.default.Router();
rootRouter.get("/", rootController_1.Home);
rootRouter.get("/serch", rootController_1.serch);
rootRouter.route("/login").all(middlewares_1.publicOnlyMiddleware).get(rootController_1.getLogin).post(rootController_1.postLogin);
rootRouter.route("/join").all(middlewares_1.publicOnlyMiddleware).get(rootController_1.getJoin).post(rootController_1.postJoin);
exports.default = rootRouter;
