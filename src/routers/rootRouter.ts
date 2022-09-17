import express from "express";
import { Home,getJoin,postJoin,getLogin,postLogin,serch } from "../controllers/rootController";
import { publicOnlyMiddleware } from "../middlewares";
const rootRouter = express.Router();
rootRouter.get("/",Home)
rootRouter.get("/serch", serch)
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);



export default rootRouter
