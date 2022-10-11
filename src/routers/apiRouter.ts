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
            Headers:{"Access-Control-Allow-Origin":"*"},
            msg:"GET 으로 잘왔네",
            json:"이것은 제이슨",
            fet:"fetch로는 되는데 ajax는 안되노"
        })
    })
    .post((req: any,res: any)=>{
        console.log(req)
        return res.status(200).send("post 으로 잘왔네")
    })
    .delete((req: any,res: any)=>{
        console.log(req)
        return res.status(200).send("delete 으로 잘왔네")
    })
    .patch((req: any,res: any)=>{
        console.log(req)
        return res.status(200).send("patch 으로 잘왔네")
    })
export default apiRouter;