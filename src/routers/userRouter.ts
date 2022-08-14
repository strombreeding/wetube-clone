import express,{RequestHandler} from "express";
import {edit,logOut,Delete,myPage,startGithubLogin,finishGithubLogin} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/:id/logout",logOut)
userRouter.get("/:id",myPage)
userRouter.get("/:id/delete",Delete)
userRouter.get("/:id/edit",edit)


export default userRouter
