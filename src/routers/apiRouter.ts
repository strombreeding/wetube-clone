import express,{RequestHandler} from "express";
import { async } from "regenerator-runtime";
import { a,b,storageAvatarz,checkEmail, checkName, sosialDelete,registerView, addComment, editComment, deleteComment,   } from "../controllers/apiController";
import { storageAvatar,protectOnlyMiddleware, preVideo, requestHandler } from "../middlewares";
import Test from "../models/Test";

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
const testzz:RequestHandler = async(req,res)=>{
    const {a,b} = req.query
    console.log(req.query)
    if(!a || !b){
        throw new Error("둘중하나는 입력해야지")
    }
    await Test.create({
        a,
        b
    })
    
}
apiRouter.route("/test").get(requestHandler(testzz))


export default apiRouter;

