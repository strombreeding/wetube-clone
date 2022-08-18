import express from "express";
import {watch,getUpload,postUpload,getEdit,remove, postEdit,} from "../controllers/videoController"
import { protectOnlyMiddleware } from "../middlewares";

const videoRouter = express.Router();


videoRouter.route("/upload").all(protectOnlyMiddleware).get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})",watch)
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectOnlyMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/remove").all(protectOnlyMiddleware).get(remove)

export default videoRouter
