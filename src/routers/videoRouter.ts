import express, { NextFunction, RequestHandler } from "express";
import {watch,getUpload,postUpload,getEdit,remove, postEdit,} from "../controllers/videoController"
import {protectOnlyMiddleware,  uploadVideo } from "../middlewares";

const videoRouter = express.Router();
const sessionRandom:RequestHandler = (req,res,next)=>{
    req.session.random=`${Math.round(Math.random()*200000)}`
    next()
}

videoRouter.route("/upload").all(protectOnlyMiddleware).get(getUpload).post(sessionRandom,uploadVideo.single("video"),postUpload);
videoRouter.get("/:id([0-9a-f]{24})",watch)
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectOnlyMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/remove").all(protectOnlyMiddleware).post(remove)

export default videoRouter
