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
    const {a,b,c} = req.query
    console.log(req.query)
    if(!a || !b){
        throw new Error("둘중하나는 입력해야지")
    }
    await Test.create({
        a,
        b,
        c
    })
    req.flash("error","완료")
    return res.status(200).redirect("/")
}
const testFind:RequestHandler = async(req,res)=>{
    const {page} = req.query
    const perPage = 10
    const total = await Test.countDocuments({});
    console.log("다큐먼트 개수 : ",total);
    const posts = await Test.find({})
    .sort({createdAt:-1}) //정렬
    .skip(perPage*(Number(page)-1)) // 얼만큼 스킵하고 데이터 찾을것인지.(예-1페이지는 10x0 이므로 스킵x)
    .limit(perPage) // 데이터를 얼마나 가져올 것인가
    const totalPage = Math.ceil(total/perPage) // 총 페이지 수
    res.render("404",{errMsg:posts,pageTitle:totalPage})
}
apiRouter.route("/test").get(requestHandler(testzz))
apiRouter.get("/z",testFind)

export default apiRouter;

