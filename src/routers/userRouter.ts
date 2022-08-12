import express,{RequestHandler} from "express";
import {edit,logOut,Delete,myPage} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/:id/logout",logOut)
userRouter.get("/:id",myPage)
userRouter.get("/:id/delete",Delete)
userRouter.get("/:id/edit",edit)


export default userRouter
