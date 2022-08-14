import express from "express";
import {watch,getUpload,postUpload,getEdit,remove, postEdit,} from "../controllers/videoController"

const videoRouter = express.Router();


videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})",watch)
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.post("/:id([0-9a-f]{24})/remove",remove)

export default videoRouter
