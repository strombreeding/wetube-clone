import express,{RequestHandler} from "express";
import multer from "multer";
import { a,b,storageAvatarz,checkEmail, checkName, sosialDelete,registerView, addComment, editComment, deleteComment,  } from "../controllers/apiController";
import { storageAvatar,protectOnlyMiddleware, preVideo } from "../middlewares";

const apiRouter = express.Router();


apiRouter.route("/comment/edit").post(editComment).delete(deleteComment)
apiRouter.route("/check/email").post(checkEmail)
apiRouter.route("/check/name").post(checkName)
apiRouter.route("/sosial/exit").post(sosialDelete)
apiRouter.route("/video/:id([0-9a-f]{24})/view").post(registerView)
apiRouter.route("/videos/:id/comment").post(addComment)
apiRouter.route("/avatarUrl/save").post(storageAvatar.single("avatar"),storageAvatarz)
apiRouter.route("/preview/save").post(b,preVideo.single("video"),a)


export default apiRouter;