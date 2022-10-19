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
// side project test api
apiRouter.route("/test")
    .get((req: any,res: any)=>{
        console.log(req)
        return res.status(200).json({
            msg:"GET 으로 잘왔네",
            data:"이것은 제이슨",
        })
    })
    .post((req: any,res: any)=>{
        console.log(req.body)
        const a = req.body
        return res.status(200).json({
            msg:"post 으로 잘왔네",
            data:a,
        })
    })
    .delete((req: any,res: any)=>{
        console.log(req.body)
        return res.status(200).json({
            msg:"delete 으로 잘왔네",
            data:a,
        })
    })
    .patch((req: any,res: any)=>{
        console.log(req.body)
        return res.status(200).json({
            msg:"patch 으로 잘왔네",
            data:a,
        })
    })
export default apiRouter;