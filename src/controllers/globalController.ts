import { RequestHandler } from "express"

export const Home:RequestHandler = (req,res) => res.send("Home")
export const Join:RequestHandler = (req,res) => res.send("Join")
export const Login:RequestHandler = (req,res) => res.send("Login")
