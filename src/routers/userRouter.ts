import express,{RequestHandler} from "express";
import {logOut,Delete,startGithubLogin,finishGithubLogin,sosialDelete,sosialCreatePw,getEdit,postEdit, getIndividualPage,postIndividualPage} from "../controllers/userController"
import { protectOnlyMiddleware } from "../middlewares";


const userRouter = express.Router();

userRouter.post("/sosial/exit",sosialDelete)
userRouter.post("/sosial",sosialCreatePw)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/logout",logOut)
userRouter.get("/:id/delete",Delete)
userRouter.route("/:id/userPlace").get(getIndividualPage).post(postIndividualPage)
userRouter.route("/:id/edit-profile").all(protectOnlyMiddleware).get(getEdit).post(postEdit)



export default userRouter
