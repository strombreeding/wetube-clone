import express from "express";
import { Home,getJoin,postJoin,getLogin,postLogin,serch,checkEmail,checkName } from "../controllers/rootController";

const rootRouter = express.Router();
rootRouter.get("/",Home)
rootRouter.get("/serch", serch)
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.post("/check/email",checkEmail);
rootRouter.post("/check/name",checkName);



export default rootRouter
