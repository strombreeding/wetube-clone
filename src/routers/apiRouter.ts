import express,{RequestHandler} from "express";
import multer from "multer";
import { a,storageAvatarz,checkEmail, checkName, sosialDelete,registerView,  } from "../controllers/apiController";
import { storageAvatar,protectOnlyMiddleware, preVideo } from "../middlewares";

const apiRouter = express.Router();


apiRouter.route("/check/email").post(checkEmail)
apiRouter.route("/check/name").post(checkName)
apiRouter.route("/sosial/exit").post(sosialDelete)
apiRouter.route("/video/:id([0-9a-f]{24})/view").post(registerView)
apiRouter.route("/avatarUrl/save").post(storageAvatar.single("avatar"),storageAvatarz)
apiRouter.route("/preview/save").post(preVideo.single("video"),a)


export default apiRouter;