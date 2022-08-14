import { RequestHandler, RequestParamHandler } from "express";

export const localMiddleware = (req:any,res:any,next:Function)=>{
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.username = req.session.username
    res.locals.uniqueId = req.session.uniqueId
    next()
}