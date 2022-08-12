import express from "express";
import { Home,Join,Login } from "../controllers/globalController";

const globalRouter = express.Router();
globalRouter.get("/",Home)
globalRouter.get("/join", Join)
globalRouter.get("/login", Login)


export default globalRouter
