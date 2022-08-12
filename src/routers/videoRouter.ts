import express from "express";
import {watch,upload,edit,serch,remove} from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/",serch)
videoRouter.get("/:id",watch)
videoRouter.get("/upload",upload)
videoRouter.get("/:id/edit",edit)
videoRouter.get("/:id/remove",remove)

export default videoRouter
