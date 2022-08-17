import express,{RequestHandler} from "express";
import {logOut,Delete,startGithubLogin,finishGithubLogin,sosialDelete,sosialCreatePw,getEdit,postEdit} from "../controllers/userController"


const userRouter = express.Router();

userRouter.post("/sosial/exit",sosialDelete)
userRouter.post("/sosial",sosialCreatePw)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/logout",logOut)
userRouter.get("/:id/delete",Delete)
userRouter.route("/:id/edit-profile").get(getEdit).post(postEdit)



export default userRouter
