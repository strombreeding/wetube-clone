import { RequestHandler } from "express";

export const myPage:RequestHandler = (req,res) => {
    return res.send(`${req.params.id}'s page`)
}
export const edit:RequestHandler = (req,res) => res.send("Edit User")
export const Delete:RequestHandler = (req,res) => res.send("회원 탈퇴")
export const logOut:RequestHandler = (req,res) => res.send("logOut")